import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function AddInput({headerTitle, placeholder, value, onChangeText}) {
    return(
    <View style={styles.wrapperItem}>
        <Text style={styles.label}>{headerTitle}</Text>
        <TextInput 
        style={{height: 50}} 
        placeholder={placeholder} 
        placeholderTextColor="#2E2E2E"
        value={value}
        onChangeText={onChangeText}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    wrapperItem: {
        backgroundColor: "rgba(169, 169, 169, 0.4)",
        justifyContent: "space-evenly",
        width: "94%",
        height: 80,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "darkgray",
        paddingLeft: 8
    },
    label: {
        fontWeight: "bold",
        fontSize: 13,
        color: "#FF8C00",
        marginBottom: 6
    },
})