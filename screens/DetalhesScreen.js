import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState, useContext, useCallback} from 'react';
import { DispositivoContext } from '../context/ContextData';
import { useFocusEffect } from '@react-navigation/native';
import MainInfoWrapper from '../components/MainInfoWrapper';
import PowerInfoWrapper from '../components/PowerInfoWrapper';

export default function DetalhesScreen({navigation, route}) {
    const { dispositivos, setDispositivos, fetchData } = useContext(DispositivoContext);
    const [selectedDevice, setSelectedDevice] = useState({});
    const [currentSwitch, setCurrentSwitch] = useState();

    const { itemId, switchState } = route?.params;

    const findDispositivo = () => {
        const foundDevice = dispositivos.find(device => device.id === itemId);
        setSelectedDevice(foundDevice);
        setCurrentSwitch(switchState)
    }

    useFocusEffect(
        useCallback(() => {
            findDispositivo()
        }, [itemId])
    )

    return (
        <ImageBackground source={require('../assets/prism.png')} style={styles.background}>
            <ScrollView style={styles.scrollview}>
                <View style={{borderBottomColor: 'gray', borderBottomWidth: 2}}>
                    <Text style={styles.controleText}>CONTROLE:</Text>
                    <MainInfoWrapper device={selectedDevice} currentSwitch={currentSwitch} setSwitch={setCurrentSwitch} navigation={navigation}/>
                </View>

                <View>
                    <Text style={styles.controleText}>CONSUMO:</Text>
                    <PowerInfoWrapper />
                </View>
                
            </ScrollView>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: "center",
        padding: 20
    },
    scrollview: {
        flex: 1,
        width: '100%',
    },
    controleText: {
        color: '#f5f5f5',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        marginLeft: 6
    }
})