import {useState, useEffect, useContext, useCallback} from 'react';
import {DispositivoContext} from '../context/ContextData';
import { Text, View, StyleSheet, ImageBackground, FlatList, ActivityIndicator} from 'react-native';
import AddButton from '../components/AddButton';
import RenderItem from '../components/RenderItem';
import ReloadButton from '../components/ReloadButton';

export default function HomeScreen({navigation}) {
    const { dispositivos, setDispositivos, fetchData, isLoading } = useContext(DispositivoContext);

    return (
        <ImageBackground source={require("../assets/prism.png")} style={styles.background}>

            <AddButton navigation={navigation} />

            <View style={styles.textWrapper}>
                <Text style={styles.aparelhosText}>SEUS DISPOSITIVOS:</Text>
            </View>

            <ReloadButton fetchData={fetchData}/>
            {dispositivos? 

            <FlatList
            style={styles.flatlist}
            data={dispositivos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RenderItem item={item} navigation={navigation} />}
            /> : 
            <View style={{maxWidth: '80%'}}>
            <Text style={{
                color: '#f5f5f5',
                fontWeight: "bold",
                marginTop: 10,
                textAlign: 'center'
            }}>Você não possui nenhum dispositivo cadastrado. Adicione um para visualizá-lo aqui.</Text>
            </View>}
            
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        alignItems: "center",
    },
    aparelhosText: {
        color: '#f5f5f5',
        fontWeight: "bold",
        fontSize: 20
    },
    textWrapper: {
        width: "85%",
        alignItems: "center",
        borderBottomColor: "#f5f5f5",
        borderBottomWidth: 2,
        padding: 6,
        marginTop: 20
    },
    flatlist: {
        width: '90%',
        height: "fit-content",
        maxHeight: 450,
        marginTop: 15,
    },
    nullTxt: {
        color: "#f5f5f5",
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'justify',
        lineHeight: 24
    },
    backgroundTxt: {
        padding: 10,
        backgroundColor: 'rgba(222, 222, 222, 0.2)',
        marginTop: 20,
        maxWidth: '80%',
        borderRadius: 10
    },
    activity: {
        marginTop: 30,
        
    }

})