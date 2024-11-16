import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import CadastroScreen from '../screens/Cadastro';
import HomeNavigator from '../navigation/HomeNavigator';
import HeaderLogin from '../components/HeaderLogin';
import { StatusBar} from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
  <NavigationContainer independent={true}>
  <StatusBar hidden={true} />

  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} options={{header: () => <HeaderLogin />, gestureEnabled: false}}/>
    <Stack.Screen name="Cadastro" component={CadastroScreen} options={{header: () => <HeaderLogin />, gestureEnabled: false}}/>
    <Stack.Screen name="HomeNavigator" component={HomeNavigator} options={{headerShown: false, gestureEnabled: false}}/>
  </Stack.Navigator>

  </NavigationContainer>
    );
}
/*

*/