import {View, Text} from 'react-native';
import React from 'react';
import Layout from '../components/layOut';
import OrderList from '../components/orderListComponent';

const Orderscreen = ({
  navigation,
  handleBack,
}: {
  navigation: any;
  handleBack: any;
}) => {
  const orders = [
    {id: '1', name: 'Apple', quantity: 3, price: 1.5},
    {id: '2', name: 'Banana', quantity: 2, price: 0.75},
    {id: '3', name: 'Cherry', quantity: 10, price: 0.2},
  ];
  return (
    <Layout
      headerText="Orders"
      navigation={() => {
        handleBack(0);
      }}>
      <OrderList
        orders={orders}
        onItemPress={() => {
          navigation.navigate('billingscreen');
        }}
      />
    </Layout>
  );
};

export default Orderscreen;
