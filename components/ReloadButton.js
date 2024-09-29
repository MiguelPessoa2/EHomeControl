import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ReloadButton({fetchData}) {

    return (
        <TouchableOpacity style={styles.button} onPress={fetchData}>
            <LinearGradient
            style={styles.gradient}
            colors={['#e65c00', '#ff8b3d']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
                <Text style={styles.textButton}>ATUALIZAR DISPOSITIVOS</Text>
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
        padding: 2,
        marginTop: 10
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