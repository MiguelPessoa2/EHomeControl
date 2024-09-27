import {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import InputLogin from '../components/InputLogin';
import CadastroButton from '../components/CadastroButton';

export default function Cadastro ({navigation}) {

    const [userInput, setUserInput] = useState("");
    const [senhaInput, setSenhaInput] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    const [feedbackMessage, setFeedbackMessage] = useState("");

    const getFeedback = () => {

        if(!userInput || !senhaInput){
            setFeedbackMessage("");
            return
        }
        if(userInput.length <= 3){
            setFeedbackMessage("usuário deve conter 4 ou mais caracteres.");
            return
        }

        if(senhaInput.length <= 7){
            setFeedbackMessage("Senha deve conter 8 ou mais caracteres.");
            return
        }

        if(confirmSenha !== senhaInput){
            setFeedbackMessage("As senhas inseridas não são iguais.");
            return
        }

        setFeedbackMessage("");

    }

    useEffect(() => {
        getFeedback();

    }, [userInput, senhaInput, confirmSenha]);
    
    return(
        <ImageBackground source={require("../assets/prism.png")} style={styles.container}>

            <Text style={styles.title}>PREENCHA OS CAMPOS ABAIXO</Text>
            <LinearGradient
            colors={['rgba(105, 105, 105, 0.7)','rgba(105, 105, 105, 0.2)','rgba(105, 105, 105, 0.7)']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
                <InputLogin iconName='user' value={userInput} onChangeText={setUserInput} placeholder='Usuário: ' />
                <InputLogin iconName='lock' value={senhaInput} onChangeText={setSenhaInput} placeholder='Senha: ' />
                <InputLogin iconName='lock' value={confirmSenha} onChangeText={setConfirmSenha} placeholder='Confirmar senha: ' />
            </LinearGradient>
            <Text style={styles.feedback}>{feedbackMessage}</Text>

            <CadastroButton username={userInput} senha={senhaInput} confirmSenha={confirmSenha} navigation={navigation}/>

            <View style={styles.wrapperButton}>
                <Text style={styles.noLogin}>Já possui Login?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.cadastro}>Fazer Login</Text>
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
        gap: 20
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
        textAlign: "center"
    }
})