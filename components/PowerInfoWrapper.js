import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'
export default function PowerInfoWrapper() {;

    return (
        <View style={styles.wrapper}>
            <View style={styles.infoContainer}>
                <Icon name='plug' size={34} color="#c20e20"/>
                <Text style={styles.iconText}>Watts</Text>
                <Text style={styles.iconText2}>O W</Text>
            </View>

            <View style={styles.infoContainer}>
            <Icon name='bolt' size={34} color="#ff952b"/>
            <Text style={styles.iconText}>Amperes</Text>
            <Text style={styles.iconText2}>0 A</Text>
            </View>

            <View style={styles.infoContainer}>
            <Icon name='car-battery' size={34} color="#067802"/>
            <Text style={styles.iconText}>Volts</Text>
            <Text style={styles.iconText2}>0 V</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        padding: 10,
        gap: 8,
        width: '100%',
        height: 170,
    },
    infoContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        borderRadius: 10,
        borderWidth: 4,

    },
    iconText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconText2: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600'
    }
})