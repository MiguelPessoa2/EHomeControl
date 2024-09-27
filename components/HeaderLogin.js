import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 
export default function HeaderLogin() {
    return (
        <View style={styles.gradient}>

            <Text style={styles.title}>EHomeControl</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    gradient: {
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#242424",
        borderBottomColor: "gray",
        borderBottomWidth: 4

    },
    title: {
        fontSize: 24,
        color: '#ffaa00',
        fontWeight: 'bold',
        textShadowColor: '#000', 
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 40
    }
})