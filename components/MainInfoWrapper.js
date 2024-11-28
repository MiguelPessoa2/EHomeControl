import { Alert, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet} from 'react-native';
import { useState, useEffect, useContext, useCallback} from 'react';
import { DispositivoContext } from '../context/ContextData';
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainInfoWrapper({device, currentSwitch, setSwitch, navigation}) {
    const { dispositivos, setDispositivos, fetchData } = useContext(DispositivoContext);

    const [deleteMsg, setDeleteMsg] = useState("DELETAR DISPOSITIVO");

    const handleDelete = async() => {
        if (deleteMsg === "SEGURE PARA CONFIRMAR") {

            const newDispositivos = dispositivos.filter(disp => disp.id !== device.id);

            if(newDispositivos.length === 0){
                await AsyncStorage.setItem("userDispositivos", "null");
                setDispositivos(null);
                Alert.alert("Dispositivo deletado com sucesso");
                navigation.navigate("Home");
                return
            }

            await AsyncStorage.setItem("userDispositivos", JSON.stringify(newDispositivos));
            setDispositivos(newDispositivos);
            Alert.alert("Dispositivo deletado com sucesso");
            navigation.navigate("Home");

        }
    };
    
    const confirmDelete = () => {
        if(deleteMsg == "DELETAR DISPOSITIVO"){
            setDeleteMsg("SEGURE PARA CONFIRMAR");
            return
        }

        if(deleteMsg == "SEGURE PARA CONFIRMAR"){
            setDeleteMsg("DELETAR DISPOSITIVO");
        }
    }

    const handleSwitch = async() => {
        if(!currentSwitch){
            Alert.alert("Dispositivo não conectado.", "Não foi possível estabelecer conexão com esse dispositivo. Verifique se o dispositivo está ligado.")
            return
        }

        try {
            const newState = currentSwitch === 'on' ? 'off' : 'on';

            await axios.post(`http://${device.ip}:8081/zeroconf/switch`, {
    
                deviceId: "",
                data: {
                    switch: newState
                }
            }, {
                timeout: 5000
            });
            setSwitch(newState);

            const newLog = {
                timestamp: new Date(), // Data e hora atual
                action: newState === 'on' ? 'Ligado' : 'Desligado'
            };
            
            setDispositivos((prevDispositivos) => {
                const updatedDispositivos = prevDispositivos.map((dispositivo) =>
                    dispositivo.id === device.id
                        ? {
                              ...dispositivo,
                              data: { ...dispositivo.data, switch: newState },
                              logs: [...(dispositivo.logs || []), newLog] // Garante que 'logs' seja um array antes de adicionar o novo log
                          }
                        : dispositivo // Mantém os outros dispositivos inalterados
                );
    
                // Atualiza o AsyncStorage com o estado mais recente
                AsyncStorage.setItem("userDispositivos", JSON.stringify(updatedDispositivos));
    
                return updatedDispositivos;
            });

        } catch (error) {
            Alert.alert("Houve um erro ao mudar o estado do dispositivo. ", error)
        }
    }

    function getColorPorEstado() {
        if(currentSwitch === "on"){
            return "#4ce651"
        }

        if(currentSwitch === "off"){
            return "#cf3d1d"
        }
    }

    return (
        <LinearGradient 
        style={styles.container}
        colors={['#e0e0e0', '#a8a8a8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        >
            <View style={styles.header}>
                <Text style={styles.nameText}>{device.name}</Text>
            </View>

            <View style={styles.mainInfoContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.descText}>{device.desc}</Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.descText2}>SWITCH: </Text>
                        <Text style={[styles.descText2, {color: getColorPorEstado()}]}>{currentSwitch?.toUpperCase()}</Text>
                    </View>

                </View>



                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.switchButton} onPress={handleSwitch}>
                        <Icon name={"power-off"} size={24} color="white" />
                     </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity style={styles.footer} onPress={confirmDelete} onLongPress={handleDelete}>
                <Text style={styles.deleteText}>{deleteMsg}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 0.5,
        overflow: 'hidden',
    },
    header: {
        width: '100%',
        height: 40,
        backgroundColor: '#5c5c5c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    mainInfoContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    leftContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderColor: 'rgba(148, 148, 148, 0.4)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        gap: 6
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    descText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
    },
    descText2: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black'
    },
    switchText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnEdit: {
        height: 70,
        width: 70,
        backgroundColor: '#6d91a8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#496070',
        borderWidth: 2
    },
    switchButton: {
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e33939',
        borderRadius: 40,
        borderColor: '#780c0c',
        borderWidth: 2
    },
    footer: {
        height: 40,
        width: '100%',
        backgroundColor: '#d11d1d',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14
    }
})
