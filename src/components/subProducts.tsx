import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import AddToCartCard from './addToCart';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import Layout from './layOut';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {toPascalCase} from '../products.config';
import {filterArrayByString} from '../redux/utils';
import {productListRequested} from '../redux/silces/product.slice';
import {IProduct} from '../redux/redux.constants';
import CustomModal from './commonModal';

const SubProductList = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  const currentCartList = useSelector(
    (state: RootState) => state.cart.currentCart,
  );
  const currentCategory = useSelector(
    (state: RootState) => state.product.currentCategory,
  );
  const {productList, isLoading} = useSelector(
    (state: RootState) => state.product,
  );

  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<IProduct[]>([]);
  const [items, setItems] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const [openModal, setopenModal] = useState<boolean>(false);

  const handleNavigation = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    dispatch(productListRequested(currentCategory?.id ?? ''));
  }, [dispatch, currentCategory]);

  useEffect(() => {
    if (productList) {
      setItems(productList);
      setFilteredItems(productList);
    }
  }, [productList]);

  useEffect(() => {
    setFilteredItems(filterArrayByString(items, searchText));
  }, [searchText, items]);

  return (
    <Layout
      headerText={`Sub products for "${currentCategory?.name}"`}
      navigation={handleNavigation}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${currentCategory?.name}`}
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="black"
        />
      </View>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            style={{marginTop: '50%', marginHorizontal: 10}}
          />
        ) : (
          <>
            {items.length === 0 ? (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: 'black',
                  marginTop: '40%',
                }}>
                No products found !!
              </Text>
            ) : (
              <View style={styles.container}>
                {filteredItems.map((item, index) => (
                  <Pressable key={item?.productId}>
                    {index === selectedItem ? (
                      <AddToCartCard
                        item={item}
                        setSelectedItem={setSelectedItem}
                      />
                    ) : (
                      <View
                        onTouchEnd={() => setSelectedItem(index)}
                        style={styles.item}>
                        <Text style={styles.text}>
                          {toPascalCase(item.title)}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <CustomModal open={openModal} setOpen={setopenModal} type="addProduct" />
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{justifyContent: 'space-between'}}>
          <Button
            mode="outlined"
            onPress={() => {
              setopenModal(true);
            }}>
            + Add new product
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            mode="contained"
            disabled={currentCartList.items.length === 0}
            onPress={() => navigation.navigate('cart')}>
            Checkout
          </Button>
          <Button
            onPress={() => navigation.navigate('home')}
            style={styles.button}
            mode="outlined">
            Add more items
          </Button>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  searchInput: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    color: 'black',
  },
  container: {
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
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
    borderRadius: 6,
  },
  text: {
    color: 'black',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    // marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    // marginRight: 20,
    marginLeft: 25,
  },
  button: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default SubProductList;
