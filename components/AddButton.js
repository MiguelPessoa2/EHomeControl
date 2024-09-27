import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AddButton ({navigation}) {

    return (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Adicionar")}>
            <LinearGradient
            style={styles.gradient}
            colors={['#0d8016', '#4bab53']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
                <Text style={styles.textButton}>ADICIONAR APARELHO</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "80%",
        height: 60,
        borderRadius: 30,
        borderColor: '#707070',
        borderWidth: 3,
        padding: 2
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },
    textButton: {
        color: '#f5f5f5',
        fontWeight: "bold"
    }
})