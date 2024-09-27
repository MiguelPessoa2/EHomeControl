import { useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import InputLogin from '../components/InputLogin';
import LoginButton from '../components/LoginButton';

export default function Login ({navigation}) {
    const [loginInput, setLoginInput] = useState("");
    const [senhaInput, setSenhaInput] = useState("");

    const [feedback, setFeedback] = useState("");

    return(
        <ImageBackground source={require("../assets/prism.png")} style={styles.container}>

            <Text style={styles.title}>FAÇA LOGIN PARA CONTINUAR</Text>
            <LinearGradient
            colors={['rgba(105, 105, 105, 0.7)','rgba(105, 105, 105, 0.2)','rgba(105, 105, 105, 0.7)']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
                <InputLogin iconName='user' value={loginInput} onChangeText={setLoginInput} placeholder='Usuário: ' />
                <InputLogin iconName='lock' value={senhaInput} onChangeText={setSenhaInput} placeholder='Senha: ' />
            </LinearGradient>

            <Text style={styles.feedback}>{feedback}</Text>
            <LoginButton navigation={navigation} login={loginInput} password={senhaInput} setFeedback={setFeedback}/>

            <View style={styles.wrapperButton}>
                <Text style={styles.noLogin}>Não possui login?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.cadastro}>Fazer Cadastro</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
        gap: 10
    },
    gradient: {
        width: "80%",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        bordercolor: "black",
        borderWidth: 3,
        borderRadius: 10,
        gap: 10
    },
    title: {
        color: '#f5f5f5',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12
    },
    wrapperButton: {
        flexDirection: "row",
        gap: 4
    },
    noLogin: {
        color: '#bfbfbf',
        fontWeight: '600'
    },
    cadastro: {
        color: '#8ac2ff',
        fontWeight: '600'
    },
    feedback: {
        maxWidth: "90%",
        color: "#f00722",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30
    }
})