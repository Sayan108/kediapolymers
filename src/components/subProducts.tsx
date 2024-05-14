import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import AddToCartCard from './addToCart';
const SubProductList = () => {
  const items = ['90 degree elbow', '45 degree elbow', '120 degree elbow'];
  const [showAddCart, setshowAddCart] = useState<boolean>(false);
  const [selectedItem, setselectedItem] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Products</Text>

      {items.map((item, index) => (
        <Pressable key={index}>
          {index === selectedItem ? (
            <AddToCartCard />
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
    </View>
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
