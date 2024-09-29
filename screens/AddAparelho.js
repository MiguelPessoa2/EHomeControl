import { StyleSheet, ImageBackground } from "react-native";
import AddForm from '../components/AddForm';

export default function AddAparelho({navigation}) {

    return(
        <ImageBackground source={require("../assets/prism.png")} style={styles.background}>
            <AddForm navigation={navigation}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
    }
})