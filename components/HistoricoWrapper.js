import { View, StyleSheet, Text, FlatList } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export default function HistoricoWrapper({device}) {;

    const renderLogItem = ({ item }) => {
        const getColor = () => {
            if (item.action === 'Ligado') {
                return '#89d152';
            }
            if (item.action === 'Desligado') {
                return '#c96053';
            }
        };
    
        // Converte o timestamp para um objeto Date e formata usando toLocaleString()
        const formattedDate = new Date(item.timestamp).toLocaleString();
    
        return (
            <View style={[styles.renderItemView, { backgroundColor: getColor() }]}>
                <Text>Data: {formattedDate}</Text>
                <Text>Ação: {item.action}</Text>
            </View>
        );
    };


    return (
        <LinearGradient
         style={styles.container}
         colors={['#e0e0e0', '#a8a8a8']}
         start={{x: 0, y: 0}}
         end={{x: 1, y: 1}}
         >
            <FlatList
                nestedScrollEnabled
                data={device.logs} // Dados dos logs
                style={styles.flatlist}
                keyExtractor={(device, index) => index.toString()} // Garante que cada log tenha uma chave única
                ListEmptyComponent={
                <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                    <Text>Nenhum registro disponível.</Text>
                </View>
                }
                renderItem={renderLogItem}
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 400,
        backgroundColor: 'gray',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        padding: 4,
        marginBottom: 20,
        overflow: 'hidden'
        
    },
    renderItemView: {
        width: '100%',
        height: 60,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        alignItems: "flex-start",
        paddingLeft: 10
    },
    flatlist: {
        flex: 1,
    }
})