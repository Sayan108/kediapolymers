import * as React from 'react';
import {BottomNavigation, TouchableRipple} from 'react-native-paper';

import {StyleSheet, Text, View} from 'react-native';
import HomePageComponent from '../components/homePageComponent';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [index, setIndex] = React.useState(0);

  const handleIndexChange = (params: number) => {
    setIndex(params);
  };
  const homePageRoute = () => <HomePageComponent navigation={navigation} />;

  const CartPage = () => (
    <View>
      <Text style={{color: 'black'}}>cart</Text>
    </View>
  );
  const OrdersPage = () => (
    <View>
      <Text style={{color: 'black'}}>order</Text>
    </View>
  );

  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'cart',
      title: 'Cart',
      focusedIcon: 'cart',
      unfocusedIcon: 'cart-outline',
    },
    {
      key: 'orders',
      title: 'Orders',
      focusedIcon: 'timer-sand-full',
      unfocusedIcon: 'timer-sand-empty',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: homePageRoute,
    cart: CartPage,
    orders: OrdersPage,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      style={styles.bottomNavigation}
      // activeColor="rgba(245, 71, 73, 0.1)"
      // activeIndicatorStyle={{shadowColor: 'rgba(245, 71, 73, 0.1)'}}
    />
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    backgroundColor: 'red', // Example background color
    borderTopWidth: 1, // Example border style
    borderTopColor: 'gray', // Example border color
  },
});

export default HomeScreen;