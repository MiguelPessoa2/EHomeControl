import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState, useContext, useCallback} from 'react';
import { DispositivoContext } from '../context/ContextData';
import { useFocusEffect } from '@react-navigation/native';
import MainInfoWrapper from '../components/MainInfoWrapper';
import HistoricoWrapper from '../components/HistoricoWrapper';
import CalcularConsumoBtn from '../components/LimparLogsBtn';
import ConsumoWrapper from '../components/ConsumoWrapper';

export default function DetalhesScreen({navigation, route}) {
    const { dispositivos, setDispositivos, fetchData } = useContext(DispositivoContext);

    const [selectedDevice, setSelectedDevice] = useState({});
    const [currentSwitch, setCurrentSwitch] = useState();

    const [intervalDias, setIntervalDias] = useState(); 
    const [valorEnergia, setValorEnergia] = useState();

    const [calcTempoEmMinutos, setCalcTempoEmMinutos] = useState();
    const [calcGastoEnergia, setCalcGastoEnergia] = useState();
    const [calcValorGasto, setCalcValorGasto] = useState();

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
                <View>
                    <Text style={styles.controleText}>DISPOSITIVO:</Text>
                    <MainInfoWrapper device={selectedDevice} currentSwitch={currentSwitch} setSwitch={setCurrentSwitch} navigation={navigation}/>
                </View>



                <View>
                    <Text style={styles.controleText}>HISTÓRICO:</Text>
                    <HistoricoWrapper device={selectedDevice}/>
                    <Text style={styles.controleText}>CONSUMO:</Text>

                    <ConsumoWrapper
                     intervalValue={intervalDias} 
                     setInterval={setIntervalDias} 
                     consumoValue={valorEnergia} 
                     setConsumoValue={setValorEnergia}
                     resultTempoEmMinutos={calcTempoEmMinutos}
                     resultGastoDeEnergia={calcGastoEnergia}
                     resultDinheiroGasto={calcValorGasto}
                     />

                    <CalcularConsumoBtn 
                    interval={intervalDias} 
                    logsList={selectedDevice.logs} 
                    precoEnergia={valorEnergia}
                    potencia={selectedDevice.potencia}
                    setTempoLigado={setCalcTempoEmMinutos}
                    setGastoEnergia={setCalcGastoEnergia}
                    setValorGasto={setCalcValorGasto}

                    />
                </View>


                {/* espaço extra no fim da tela*/}
                <View style={{height: 100}}/>
                
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
        alignItems: "center",
    },
    scrollview: {
        flex: 1,
        width: '100%',
        padding: 20
    },
    controleText: {
        color: '#f5f5f5',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        marginLeft: 6,
        alignSelf: 'center'
    }
})