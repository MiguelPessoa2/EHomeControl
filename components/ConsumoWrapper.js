import {View, Text, StyleSheet, TextInput} from 'react-native'

export default function ConsumoWrapper({intervalValue, setInterval, consumoValue, setConsumoValue, resultTempoEmMinutos, resultGastoDeEnergia, resultDinheiroGasto}) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Calcule o Gasto de Energia</Text>
            </View>
            <View style={styles.wrapperInput}>
                <View style={styles.wrapperItem}>
                    <Text>Intervalo (dias) : </Text>
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
                    <Text>Valor do kWh (R$) : </Text>
                </View>

                <View style={styles.wrapperItem}>
                    <TextInput
                    style={styles.input}
                    value={consumoValue}
                    onChangeText={setConsumoValue}
                    keyboardType='numeric'
                    placeholder={'Ex: 0.656 R$'}
                    placeholderTextColor={'black'}
                    />
                </View>
            </View>

            <View style={[styles.wrapperInput, {borderTopColor: 'rgba(0, 0, 0, 0.5)', borderTopWidth: 2}]}>
                <View style={styles.wrapperItem}>
                    <Text style={{fontWeight: 'bold'}}>Tempo ligado (minutos) :</Text>
                </View>

                <View style={styles.wrapperItem}>
                    <View style={styles.wrapperItem}>
                        <Text>{resultTempoEmMinutos}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.wrapperInput}>
                <View style={styles.wrapperItem}>
                    <Text style={{fontWeight: 'bold'}}>Gasto de energia (kWh):  </Text>
                </View>

                <View style={styles.wrapperItem}>
                    <View style={styles.wrapperItem}>
                        <Text>{resultGastoDeEnergia}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.wrapperInput}>
                <View style={styles.wrapperItem}>
                    <Text style={{fontWeight: 'bold'}}>Valor gasto (R$) :</Text>
                </View>

                <View style={styles.wrapperItem}>
                    <View style={styles.wrapperItem}>
                        <Text>{resultDinheiroGasto}</Text>
                    </View>
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

    wrapperInput: {
        width: '100%',
        height: 50,
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
        backgroundColor: '#c4c4c4',
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