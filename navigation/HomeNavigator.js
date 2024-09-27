import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddAparelho from '../screens/AddAparelho';
import DetalhesScreen from '../screens/DetalhesScreen';
import HeaderHome from '../components/HeaderHome';
import { DispositivoProvider } from '../context/ContextData';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <DispositivoProvider>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    header: ({ navigation }) => <HeaderHome navigation={navigation} title="HOME" />,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen 
                name="Adicionar" 
                component={AddAparelho} 
                options={{
                    header: ({ navigation }) => <HeaderHome navigation={navigation} title="ADICIONAR" />,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
            name="Detalhes"
            component={DetalhesScreen}
            options={{
                header: ({ navigation }) => <HeaderHome navigation={navigation} title="ADICIONAR" />,
                gestureEnabled: false
            }} />
        </Stack.Navigator>
        </DispositivoProvider>

    );
}
