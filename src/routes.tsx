import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/homePage';
import Cartpage from './screens/cartPage';
import SubProductList from './components/subProducts';
import AddBillingAddress from './screens/billingAddress';
import BillScreen from './screens/billScreen';
import {useSelector} from 'react-redux';
import {RootState} from './redux';
import LoginScreen from './screens/login';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Group>
          <Stack.Screen
            name="home"
            component={isAuthenticated ? HomeScreen : LoginScreen}
            initialParams={{id: 0}}
          />
          <Stack.Screen
            name="cart"
            component={Cartpage}
            initialParams={{id: -1}}
          />
          <Stack.Screen
            name="subproduct"
            component={isAuthenticated ? SubProductList : LoginScreen}
          />
          <Stack.Screen
            name="billingaddress"
            component={isAuthenticated ? AddBillingAddress : LoginScreen}
          />
          <Stack.Screen
            name="billingscreen"
            component={isAuthenticated ? BillScreen : LoginScreen}
            initialParams={{id: -1}}
          />
          <Stack.Screen name="login" component={LoginScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
