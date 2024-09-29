import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useState } from "react";
import axios from 'axios';

export default function RenderItem({item, navigation}) {
    const [switchState, setSwitchState] = useState(item.data?.switch);

    const handleSwitch = async() => {
        if(!switchState){
            Alert.alert("Dispositivo não conectado.", "Não foi possível estabelecer conexão com esse dispositivo. Verifique se o dispositivo está ligado.")
            return
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
            setSwitchState(newState);
    
        } catch (error) {
            Alert.alert("Houve um erro ao mudar o estado do dispositivo. ", error)
        }
    }

    function getColorPorEstado() {
        if(switchState === "on"){
            return "#4ce651"
        }

        if(switchState === "off"){
            return "#cf3d1d"
        }
    }

    return(
            <View style={{borderColor: 'black', borderWidth: 3, borderTopRightRadius: 100, borderBottomRightRadius: 100}}>
            <LinearGradient
            colors={['#c4c4c4', '#8f8f8f']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.container}>
                <>
                <View style={[styles.innerContainer, { maxWidth: 120, borderRightColor: 'black', borderRightWidth: 2, paddingRight: 10 }]}>
                    <Text style={styles.textName}>{item.name}</Text>

                    <TouchableOpacity style={styles.btnConfig} onPress={() => navigation.navigate("Detalhes", {
                        itemId: item.id,
                        switchState: switchState
                    })}>
                        <Icon name={"gear"} size={20} />
                    </TouchableOpacity>

                </View>
                
                <View style={styles.innerContainer}>
                    <Text style={styles.switchText}>SWITCH:</Text>
                    <Text style={[styles.switchText, { color: getColorPorEstado() }]}>{switchState? switchState.toUpperCase() : <Text>???</Text>}</Text>
                </View>
                
                <View style={styles.innerContainer}>

                    <TouchableOpacity style={styles.button} onPress={handleSwitch}>
                        <Icon name={"power-off"} size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </>
           
            </LinearGradient>
            </View>



    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        backgroundColor: "gray",
        padding: 10,
        gap: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
    },
    innerContainer: {
        flex: 1,
        maxWidth: 80,
        maxHeight: 80,
        justifyContent: "center",
        alignItems: "center",
        
    },
    button: {
        height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0675c",
        borderRadius: 50,
        borderColor: "darkred",
        borderWidth: 3,
    },
    textName: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4
    },
    btnConfig: {
        height: 40,
        width: '100%',
        backgroundColor: "#7ea0ab",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'gray',
        borderWidth: 2
    },
    switchText: {
        fontWeight: 'bold'
    },
    noData: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(94, 94, 94, 0.5)",
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50
    },
    noDataText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    textName2: {
        fontSize: 18,
        color: '#3d3d3d'
    }
})