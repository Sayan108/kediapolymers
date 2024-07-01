import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../components/layOut';
import OrderList from '../components/orderListComponent';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {
  getOrdersListRequested,
  setCurrentOrder,
} from '../redux/silces/order.slice';

const Orderscreen = ({
  navigation,
  handleBack,
}: {
  navigation: any;
  handleBack: any;
}) => {
  const dispatch = useDispatch();
  const {orderList} = useSelector((state: RootState) => state.order);
  const handleItemClick = (item: any) => {
    dispatch(setCurrentOrder(item));
    navigation.navigate('billingscreen', {id: item.id});
  };

  useEffect(() => {
    dispatch(getOrdersListRequested());
  }, []);

  return (
    <Layout
      headerText="Orders"
      navigation={() => {
        handleBack(0);
      }}>
      <ScrollView>
        <OrderList orders={orderList} onItemPress={handleItemClick} />
      </ScrollView>
    </Layout>
  );
};

export default Orderscreen;
