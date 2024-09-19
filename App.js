import {StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Loja from './src/pages/Loja';  
import Impressao from './src/pages/Impressao';  
import { NavigationContainer } from '@react-navigation/native';
import Entrega from './src/pages/Entrega';
import Delivery from './src/pages/Delivery';
import NotDelivery from './src/pages/NotDelivery';
import WebUberView from './src/pages/WebUberView';
import Cadastro from './src/pages/Cadastro';
import Login from './src/pages/Login';
import UserDeliveries from './src/pages/UserDeliveries';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Loja" component={Loja}/>
        <Stack.Screen name="Impressao" component={Impressao}/>
        <Stack.Screen name="Entrega" component={Entrega}/>
        <Stack.Screen name="Delivery" component={Delivery}/>
        <Stack.Screen name="Not Delivery" component={NotDelivery}/>
        <Stack.Screen name="WebUberView" component={WebUberView}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="UserDeliveries" component={UserDeliveries}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
