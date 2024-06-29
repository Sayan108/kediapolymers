import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import HomePageComponent from '../components/homePageComponent';
import Orderscreen from './orderSccreen';
import Cartscreen from './cartScreen';
import {Route} from '@react-navigation/native';
import {BaseRoute} from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation';

const HomeScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {id = 0} = route.params;

  const [index, setIndex] = React.useState(id);

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const homePageRoute = () => <HomePageComponent navigation={navigation} />;
  const cartPageRoute = () => (
    <Cartscreen navigation={navigation} handleBack={handleIndexChange} />
  );
  const ordersPageRoute = () => (
    <Orderscreen navigation={navigation} handleBack={handleIndexChange} />
  );

  const routes: BaseRoute[] = [
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
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: homePageRoute,
    cart: cartPageRoute,
    orders: ordersPageRoute,
  });

  React.useEffect(() => {
    if (id !== index) {
      setIndex(id);
    }
  }, []);

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      style={styles.bottomNavigation}
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
