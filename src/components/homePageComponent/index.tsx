import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import ListWithIcons, {Item} from './listWithIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {
  addNewCartInList,
  setCurrentCart,
  setInitialCurrentCart,
  updateCurrentCategory,
} from '../../redux/silces/cart.slice';
import {ICart, ICartItem} from '../../redux/redux.constants';
import {genetateUUID} from '../../redux/utils';

const HomePageComponent = ({navigation}: {navigation: any}) => {
  const {cartList} = useSelector((state: RootState) => state.cart);
  const {currentCart} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const items: Item[] = [
    {id: 1, text: 'Agriculture', iconName: 'accessibility'},
    {id: 2, text: 'CPVCPro', iconName: 'alarm'},
    {id: 3, text: 'FoamCore', iconName: 'alarm'},
    {id: 4, text: 'DrainPro', iconName: 'build'},
  ];

  const handleButtonClick = (item: Item) => {
    console.log(genetateUUID());
    dispatch(updateCurrentCategory(item.text));
    const cartItem: ICart = {
      id: genetateUUID().toString(),
      totalAmount: '0',
      items: [],
    };
    // if (cartList.length === 0) {
    //   dispatch(addNewCartInList(cartItem));
    // }
    if (currentCart.id === '') {
      dispatch(setInitialCurrentCart(cartItem));
    }
    navigation.navigate('subproduct');
  };

  // Filter items based on search text

  return (
    <View style={{flex: 1}}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={'black'}
        />
      </View>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
          Categories
        </Text>
      </View>
      <ListWithIcons
        items={items}
        navigation={navigation}
        handleClick={handleButtonClick}
      />
    </View>
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
    borderRadius: 28,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default HomePageComponent;
