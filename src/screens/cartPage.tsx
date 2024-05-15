import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import CartItem from '../components/cartItem';
import {Button} from 'react-native-paper';
import Layout from '../components/layOut';

const Cartpage = ({navigation}: {navigation: any}) => {
  const itemList = [
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
    {
      id: 1,
      productName: '90 degree elbow',
      dimension: '10 cm',
      quantity: '108',
      price: '100000',
    },
  ];

  const handleNavigation = () => {
    navigation.navigate('subproduct');
  };
  return (
    <Layout navigation={handleNavigation} headerText="Cart page">
      <ScrollView>
        <View style={{alignItems: 'center', paddingTop: 25}}>
          {itemList?.map((item, index) => (
            <View key={index}>
              <CartItem item={item} />
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              navigation.navigate('billingaddress');
            }}>
            {'Confirm order'}
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Cartpage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cartItem: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    width: '80%',
  },
});