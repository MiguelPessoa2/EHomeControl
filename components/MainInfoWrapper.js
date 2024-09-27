import { Alert, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet} from 'react-native';
import { useState, useEffect, useContext, useCallback} from 'react';
import { DispositivoContext } from '../context/ContextData';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainInfoWrapper({device, currentSwitch, setSwitch, navigation}) {
    const { dispositivos, setDispositivos, fetchData } = useContext(DispositivoContext);

    const [deleteMsg, setDeleteMsg] = useState("DELETAR DISPOSITIVO");

    const handleDelete = async() => {
        if (deleteMsg === "SEGURE PARA CONFIRMAR") {

            const newDispositivos = dispositivos.filter(disp => disp.id !== device.id);

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
        <>
            <View style={styles.viewWrapper}>
                <View style={styles.viewInfo}>
                    <Text style={styles.deviceName}>{device?.name}</Text>
                    <Text style={styles.deviceDesc}>{device?.desc}</Text>
                </View>

                <View style={styles.viewToggleButton}>
                    <TouchableOpacity style={styles.toggleButton} onPress={handleSwitch}>
                        <Icon name='power-off' size={24} color='white' />
                    </TouchableOpacity>

                    <Text style={styles.switchText}>SWITCH: <Text style={{ fontWeight: 'bold', color: getColorPorEstado() }}>{currentSwitch?.toUpperCase()}</Text></Text>
                </View>
            </View>

            <TouchableOpacity style={styles.editInfoBtn}>
                <Text style={styles.editText}>EDITAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={confirmDelete} onLongPress={handleDelete}>
                <Text style={styles.editText2}>{deleteMsg}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    viewWrapper: {
        width: '100%',
        height: 140,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 4,
        marginBottom: 10

    },

    viewInfo: {
        flex: 1,
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        padding: 10,
        borderRightWidth: 2,
        borderRightColor: 'black'
    },
    viewToggleButton: {
        flex: 1,
        height: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: "center",
        gap: 6
    },
    deviceName: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    deviceDesc: {
        fontSize: 16,
    },
    editInfoBtn: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginVertical: 4,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'orange',
        borderColor: 'black',
        borderWidth: 0.5
    },
    toggleButton: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 50,
        borderColor: '#8c140b',
        borderWidth: 4,
        backgroundColor: '#e0675c'
    },
    switchText: {
        fontWeight: 'bold'
    },
    editText: {
        color: 'black',
        fontWeight: 'bold'
    },
    editText2: {
        color: '#f7f7f7',
        fontWeight: 'bold'
    },
    deleteBtn: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginVertical: 4,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#a32431',
        borderColor: 'black',
        borderWidth: 1
    }
})