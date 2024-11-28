import { Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AddInput from '../components/AddInput';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function AddForm({navigation}) {
    const [nameInput, setNameInput] = useState();
    const [descInput, setDescInput] = useState();
    const [ipInput, setIpInput] = useState();
    const [potenciaInput, setPotenciaInput] = useState();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleAddAparelho = async () => {

        const validateDispositivo = async () => {
            if (!nameInput || !descInput || !ipInput || !potenciaInput) {
                Alert.alert("Preencha todos os campos para adicionar um dispositivo.");
                return false;
            }

            if (nameInput.length < 4 || descInput.length < 4) {
                Alert.alert("O nome e descrição do dispositivo devem conter mais de 3 caracteres.");
                return false;
            }

            if (isNaN(Number(potenciaInput))) {
                Alert.alert("Insira a potência como um número válido.");
                return false;
            }

            try {
                setIsLoading(true);
                console.log("ip input: ", ipInput);
                await axios.post(`http://${ipInput}:8081/zeroconf/info`, {
                    deviceid: "",
                    data: {},
                }, {
                    timeout: 5000,
                });
                return true;

            } catch (error) {
                Alert.alert("Não foi possível encontrar o dispositivo com o endereço IP informado.");
                setIsLoading(false)
                return false;         
            }
        };

        const isValid = await validateDispositivo();

        if (isValid) {
            
            try {
                const JSONud = await AsyncStorage.getItem("userDispositivos");
                const ud = JSONud ? JSON.parse(JSONud) : [];

                    if(!ud){
                        const newDispositivo = {
                            name: nameInput,
                            desc: descInput,
                            ip: ipInput,
                            data: {},
                            id: 1,
                            potencia: potenciaInput,
                            logs: []
                        };
        
                        const newDispos = [newDispositivo];
                        await AsyncStorage.setItem("userDispositivos", JSON.stringify(newDispos));
        
                        Alert.alert("Dispositivo adicionado com sucesso!");
                        navigation.navigate("Home");

                    } else {
                        const maxId = ud.reduce((max, dispositivo) => Math.max(max, dispositivo.id), 0);
                        const novoId = maxId + 1;
        
                        const newDispositivo = {
                            name: nameInput,
                            desc: descInput,
                            ip: ipInput,
                            data: {},
                            id: novoId,
                            potencia: potenciaInput,
                            logs: []
                        };
        
                        ud.push(newDispositivo);
                        await AsyncStorage.setItem("userDispositivos", JSON.stringify(ud));
        
        
                        Alert.alert("Dispositivo adicionado com sucesso!");
                        navigation.navigate("Home");

                    }

            } catch (error) {
                Alert.alert("Erro inesperado ao adicionar dispositivo:", error.message);
            } finally {
                setIsLoading(false)
            }

        }
    };

    return(

        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Preencha os campos abaixo para adicionar um novo aparelho</Text>

            <AddInput 
            headerTitle={"Nome do Aparelho: "} 
            placeholder={"ex: Lâmpada do quarto"}
            value={nameInput}
            onChangeText={setNameInput}
            />

            <AddInput 
            headerTitle={"Descrição (opcional): "} 
            placeholder={"ex: Desligar após 23:00"}
            value={descInput}
            onChangeText={setDescInput}
            />

            <AddInput 
            headerTitle={"Endereço IP: "}
            placeholder={"Insira o IP do dispositivo"}
            value={ipInput}
            onChangeText={setIpInput}
            />

            <AddInput 
            headerTitle={"Potência (W): "}
            placeholder={"Insira a potência em Watts do dispositivo"}
            value={potenciaInput}
            onChangeText={setPotenciaInput}
            />

            <TouchableOpacity style={styles.botaoEstilo} onPress={handleAddAparelho}>
                <LinearGradient 
                colors={['rgba(0, 100, 0, 0.85)', 'rgba(0, 150, 0, 0.85)', 'rgba(0, 200, 0, 0.85)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{width: "100%", height: "100%", borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    {isLoading? <ActivityIndicator color={"black"}/> : <Text style={{color: "black", fontWeight: "700"}}>SALVAR</Text>}
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        maxHeight: '80%',
        backgroundColor: "rgba(105, 105, 105, 0.4)",
        margin: 20,
        borderRadius: 10,
        justifyContent: "center",
        paddingLeft: 20,
        paddingVertical: 20,
        gap: 18
        },
    botaoEstilo: {
        width: "94%",
        height: 60,
    },
    background: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    titulo: {
        color: "#F5F5F5",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 25,
        marginRight: 30,
        textAlign: 'center'
    }
})