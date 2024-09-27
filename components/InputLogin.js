import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function InputLogin({iconName, value, onChangeText, placeholder}) {
    return (
    <View style={styles.container}>
        <Icon name={iconName} size={20} />
        <TextInput
        value={value}
        onChangeText={onChangeText} 
        placeholder={placeholder} 
        placeholderTextColor='black' 
        style={styles.input}/>
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
        paddingLeft: 10,
        gap: 12,
        backgroundColor: 'rgba(176, 175, 172, 0.5)',
        borderRadius: 5,
        borderColor: '#9e9d99',
        borderWidth: 1
    },
    input: {
        width: "90%"
    }
})