import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import Layout from '../components/layOut';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';

const TableExample = ({navigation, route}: {navigation: any; route: any}) => {
  const {currentOrder} = useSelector((state: RootState) => state.order);
  const {id} = route.params;

  const handleNavigation = () => {
    navigation.navigate(id === -1 ? 'billingaddress' : 'home', {id: 2});
  };

  return (
    <Layout headerText="Order details" navigation={handleNavigation}>
      <View>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{flex: 9, justifyContent: 'flex-start'}}>
              Item
            </DataTable.Title>
            <DataTable.Title style={{flex: 1, justifyContent: 'flex-end'}}>
              Price
            </DataTable.Title>
          </DataTable.Header>

          {currentOrder.items.map(item => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell style={{flex: 7, justifyContent: 'flex-start'}}>
                {item.productName} X {item.count}
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 3, justifyContent: 'flex-end'}}>
                ₹ {item.totalPrice}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Row>
            <DataTable.Cell style={{flex: 7, justifyContent: 'flex-start'}}>
              {'Item price'}
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 3, justifyContent: 'flex-end'}}>
              ₹ {currentOrder.totalAmount}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{flex: 7, justifyContent: 'flex-start'}}>
              {'Tax'}
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 3, justifyContent: 'flex-end'}}>
              ₹ {parseInt(currentOrder.totalAmount) * 0.18}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{flex: 7, justifyContent: 'flex-start'}}>
              {'Total price'}
            </DataTable.Cell>
            <DataTable.Cell style={{flex: 3, justifyContent: 'flex-end'}}>
              ₹{' '}
              {parseInt(currentOrder.totalAmount) +
                parseInt(currentOrder.totalAmount) * 0.18}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View style={{padding: 15}}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate('home');
            }}>
            {'Generate invoice'}
          </Button>
        </View>
      </View>
    </Layout>
  );
};

export default TableExample;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});
