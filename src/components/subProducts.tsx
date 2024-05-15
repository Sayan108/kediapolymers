import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import AddToCartCard from './addToCart';
import {Button} from 'react-native-paper';
import Layout from './layOut';
const SubProductList = ({navigation}: {navigation: any}) => {
  const dummyItem = {productName: '90 degree elbow', price: '$25'};
  const items = ['90 degree elbow', '45 degree elbow', '120 degree elbow'];
  const [showAddCart, setshowAddCart] = useState<boolean>(false);
  const [selectedItem, setselectedItem] = useState<number | null>(null);
  const handleNavigation = () => {
    navigation.navigate('home');
  };
  return (
    <Layout headerText="Products" navigation={handleNavigation}>
      <ScrollView>
        <View style={styles.container}>
          {items.map((item, index) => (
            <Pressable key={index}>
              {index === selectedItem ? (
                <AddToCartCard item={dummyItem} />
              ) : (
                <View
                  onTouchEnd={() => {
                    setselectedItem(index);
                    console.log('touching');
                  }}
                  style={styles.item}>
                  <Text style={styles.text}>{item}</Text>
                </View>
              )}
            </Pressable>
          ))}
          <View
            style={{
              marginTop: 10,
              alignSelf: 'flex-end',
              display: 'flex',
              flexDirection: 'column',
              marginRight: 20,
            }}>
            <Button
              style={{justifyContent: 'space-between', marginBottom: 20}}
              mode="contained"
              onPress={() => {
                navigation.navigate('cart');
              }}>
              {'Checkout'}
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('home');
              }}
              style={{justifyContent: 'space-between'}}
              mode="outlined">
              {'Add more items'}
            </Button>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    alignSelf: 'center',
  },
  item: {
    width: 328,
    height: 64,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default SubProductList;
