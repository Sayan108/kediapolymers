import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import GeneratePDF from '../components/generatePdf';
import Layout from '../components/layOut';

const TableExample = ({navigation}: {navigation: any}) => {
  const handleNavigation = () => {
    navigation.navigate('billingaddress');
  };
  return (
    <Layout headerText="Order confirm" navigation={handleNavigation}>
      <View>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Favourite Food</DataTable.Title>
            <DataTable.Title>Age</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Radhika</DataTable.Cell>
            <DataTable.Cell>Dosa</DataTable.Cell>
            <DataTable.Cell>23</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Krishna</DataTable.Cell>
            <DataTable.Cell>Uttapam</DataTable.Cell>
            <DataTable.Cell>26</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Vanshika</DataTable.Cell>
            <DataTable.Cell>Brownie</DataTable.Cell>
            <DataTable.Cell>20</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Teena</DataTable.Cell>
            <DataTable.Cell>Pizza</DataTable.Cell>
            <DataTable.Cell>24</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <GeneratePDF />
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
