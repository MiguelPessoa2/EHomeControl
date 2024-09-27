import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroButton ({username, senha, confirmSenha, navigation}) {

    const handleCadastro = async() => {
        if(!username || !senha || !confirmSenha){
            Alert.alert("Verifique se todos os campos foram preenchidos.");
            return
        }

        if(username.length <= 3){
            Alert.alert("usuário deve conter 4 ou mais caracteres.");
            return
        }

        if(senha.length <= 7){
            Alert.alert("Senha deve conter 8 ou mais caracteres.");
            return
        }

        if(confirmSenha !== senha){
            Alert.alert("As senhas inseridas não são iguais.");
            return
        }

        const user = {
            userName: username,
            password: senha
        };

        try {
            await AsyncStorage.setItem("userData", JSON.stringify(user));
            Alert.alert("Usuário cadastrado!");
            navigation.navigate("Login");

        } catch (error) {
            Alert.alert("erro ao cadastrar usuário", error)
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handleCadastro} accessible={true} accessibilityLabel="Botão de cadastro">
            <LinearGradient
            style={styles.gradient}
            colors={['#ff9500', '#bf8300']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
                <Text style={styles.textButton}>CADASTRAR</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "80%",
        height: 60,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    textButton: {
        color: '#f5f5f5',
        fontWeight: "bold"
    }
})