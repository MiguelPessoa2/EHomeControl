import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginButton ({navigation, login, password, setFeedback}) {

    const handleLogin = async() => {
        const JSONud = await AsyncStorage.getItem("userData");
        const ud = JSON.parse(JSONud);

        if(ud.userName === login && ud.password === password){
            navigation.navigate("HomeNavigator");
            return
        }

        setFeedback("usuário ou senha incorretos.")
    }
    return (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient
            style={styles.gradient}
            colors={['#047a1a', '#10a32b']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
                <Text style={styles.textButton}>FAZER LOGIN</Text>
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