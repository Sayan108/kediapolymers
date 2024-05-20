import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import GeneratePDF from '../components/generatePdf';
import Layout from '../components/layOut';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';

const TableExample = ({navigation, route}: {navigation: any; route: any}) => {
  const {currentOrder} = useSelector((state: RootState) => state.order);
  console.log(currentOrder, 'currentorder');
  const {id} = route.params;
  const handleNavigation = () => {
    navigation.navigate(id === -1 ? 'billingaddress' : 'home', {id: 2});
  };
  return (
    <Layout headerText="Order details" navigation={handleNavigation}>
      <View>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{justifyContent: 'flex-start'}}>
              Item
            </DataTable.Title>
            <DataTable.Title style={{justifyContent: 'flex-end'}}>
              Price
            </DataTable.Title>
          </DataTable.Header>

          {currentOrder.items.map(item => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell style={{justifyContent: 'flex-start'}}>
                {item.productName}
              </DataTable.Cell>
              <DataTable.Cell style={{justifyContent: 'flex-end'}}>
                ₹ {item.totalPrice}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Row>
            <DataTable.Cell style={{justifyContent: 'flex-start'}}>
              {'Total price'}
            </DataTable.Cell>
            <DataTable.Cell style={{justifyContent: 'flex-end'}}>
              ₹ {currentOrder.totalAmount}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View style={{padding: 15}}>
          <Button
            mode={'contained'}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
