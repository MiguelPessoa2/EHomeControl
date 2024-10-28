import {View, Text, StyleSheet, TextInput} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";

export default function ConsumoWrapper({intervalValue, setInterval, consumoValue, setConsumoValue}) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Calcule o Gasto de Energia</Text>
            </View>
            <View style={styles.wrapperInput}>
                <View style={styles.wrapperItem}>
                    <Text>Intervalo em dias: </Text>
                </View>

                <View style={styles.wrapperItem}>
                    <TextInput
                    style={styles.input}
                    value={intervalValue}
                    onChangeText={setInterval}
                    keyboardType='numeric'
                    placeholder={'Ex: 30 dias'}
                    placeholderTextColor={'black'}
                    />
                </View>
            </View>

            <View style={styles.wrapperInput}>
                <View style={styles.wrapperItem}>
                    <Text>Valor do kWh: </Text>
                </View>

                <View style={styles.wrapperItem}>
                    <TextInput
                    style={styles.input}
                    value={intervalValue}
                    onChangeText={setInterval}
                    keyboardType='numeric'
                    placeholder={'Ex: 0.656 R$'}
                    placeholderTextColor={'black'}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'fit-content',
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        overflow: 'hidden',
        marginBottom: 10

    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    text2: {
        fontWeight: 'bold',
        fontSize: 12
    },
    input: {
        width: 60,
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 10,
        fontSize: 14
    },
    wrapperInput: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    wrapperItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        backgroundColor: '#9e9e9e',
        width: '100%',
        borderRadius: 10,
        textAlign: 'center'
    },
    header: {
        width: '100%',
        height: 40,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
})