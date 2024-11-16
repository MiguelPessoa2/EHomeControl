import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useState, useContext, useCallback } from "react";
import {DispositivoContext} from '../context/ContextData';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RenderItem({item, navigation}) {
    const { dispositivos, setDispositivos, fetchData, isLoading } = useContext(DispositivoContext);
    const [switchState, setSwitchState] = useState(item.data?.switch);

    const handleSwitch = async () => {
        if (!switchState) {
            Alert.alert("Dispositivo não conectado.", "Não foi possível estabelecer conexão com esse dispositivo. Verifique se o dispositivo está ligado.");
            return;
        }
    
        try {
            const newState = switchState === 'on' ? 'off' : 'on';
    
            await axios.post(`http://${item.ip}:8081/zeroconf/switch`, {
                deviceId: "",
                data: {
                    switch: newState
                }
            }, {
                timeout: 5000
            });
    
            // Atualiza o estado local do switch
            setSwitchState(newState);
    
            // Cria o novo log com data e hora atuais
            const newLog = {
                timestamp: new Date(), // Data e hora atual
                action: newState === 'on' ? 'Ligado' : 'Desligado'
            };
    
            // Atualiza o estado do dispositivo e adiciona o novo log
            setDispositivos((prevDispositivos) => {
                const updatedDispositivos = prevDispositivos.map((dispositivo) =>
                    dispositivo.id === item.id
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
    
            // Para verificar o conteúdo dos logs, você pode utilizar JSON.stringify() aqui
            console.log("Logs atualizados:", JSON.stringify(newLog, null, 2));
    
        } catch (error) {
            Alert.alert("Houve um erro ao mudar o estado do dispositivo. ", error.message || error);
        }
    };
    

    function getColorPorEstado() {
        if(switchState === "on"){
            return "#4ce651"
        }

        if(switchState === "off"){
            return "#cf3d1d"
        }
    }

    return(
        <LinearGradient 
        style={styles.container}
        colors={['#e0e0e0', '#a8a8a8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        >
            <View style={styles.header}>
                <Text style={styles.nameText}>{item.name.toUpperCase()}</Text>
            </View>

            <View style={styles.mainInfoContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.descText}>{item.desc}</Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.descText2}> SWITCH: </Text>
                        <Text style={[styles.switchText, { color: getColorPorEstado() }]}>{switchState? switchState.toUpperCase() : <Text>???</Text>}</Text>
                    </View>

                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.btnConfig} onPress={() => navigation.navigate("Detalhes", {
                            itemId: item.id,
                            switchState: switchState
                        })}>
                            <Icon name={"gear"} size={20} />
                        </TouchableOpacity>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.switchButton} onPress={handleSwitch}>
                        <Icon name={"power-off"} size={24} color="white" />
                     </TouchableOpacity>
                </View>

            </View>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 140,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 0.5,
        overflow: 'hidden',
    },
    header: {
        width: '100%',
        height: 40,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#383838',
        borderWidth: 2
    },
    nameText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    mainInfoContainer: {
        flex: 1,
        padding: 10,
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
    btnConfig: {
        height: 70,
        width: 70,
        backgroundColor: '#6d91a8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#2a3242',
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
    }
})


