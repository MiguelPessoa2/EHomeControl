import { useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'

export default function LimparLogsButton({interval, logsList, precoEnergia, potencia, setTempoLigado, setGastoEnergia, setValorGasto}) {

    const [loading, setLoading] = useState(false);

    const calculateConsumo = () => {
      if(interval && logsList && precoEnergia && potencia){

        setLoading(true);
    
        const now = new Date();
        const intervalLimit = new Date(now);
        intervalLimit.setDate(now.getDate() - interval);
    
        console.log('limite: ', intervalLimit.toLocaleString());
    
        // Corrige a condição de filtragem
        const filteredLogs = logsList.filter(log => new Date(log.timestamp) >= intervalLimit);
    
        console.log('logs filtrados: ', filteredLogs);
        
        let totalTimeOn = 0; // armazena o tempo total ligado
        let lastOnTime = null; 
    
        filteredLogs.forEach(log => {
            const timestamp = new Date(log.timestamp);
    
            if (log.action === 'Ligado') {
                lastOnTime = timestamp;
            } else if (log.action === 'Desligado' && lastOnTime) {
                totalTimeOn += timestamp - lastOnTime; // Diferença em milissegundos
                lastOnTime = null; // Resetamos a última vez ligado
            }
        });
    
        // Convertendo o tempo total para diferentes unidades
        const totalTimeOnInSeconds = totalTimeOn / 1000;
        const totalTimeOnInMinutes = totalTimeOnInSeconds / 60;
        const totalTimeOnInHours = totalTimeOnInMinutes / 60;
    
        console.log('tempo total ligado em segundos: ', totalTimeOnInSeconds);
        console.log('tempo total ligado em horas: ', totalTimeOnInHours);
  
        const totalConsumo = totalTimeOnInHours * potencia / 1000;
        const preco = totalConsumo * precoEnergia;
  
        console.log('consumo total em kWh: ', totalConsumo);
        console.log('valor em reais: ', preco)
  
        setTempoLigado(totalTimeOnInMinutes.toFixed(3));
        setGastoEnergia(totalConsumo.toFixed(6));
        setValorGasto(preco.toFixed(6));
        
        setLoading(false);
      } else {
        Alert.alert("Erro ao calcular consumo", "Verifique se todos os campos foram preenchidos.")
      }

  };
  

    return(
        <TouchableOpacity style={styles.container} onPress={calculateConsumo}>
            <Text style={styles.btnText}>{loading? <ActivityIndicator /> : <Text>CALCULAR CONSUMO</Text>}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white'
    },
    btnText: {
        fontWeight: 'bold',
        color: '#fff'
    }
})