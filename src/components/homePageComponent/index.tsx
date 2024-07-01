import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import ListWithIcons, {Item} from './listWithIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {
  addNewCartInList,
  setCurrentCart,
  setInitialCurrentCart,
  updateCurrentCategory,
} from '../../redux/silces/cart.slice';
import {ICart, category} from '../../redux/redux.constants';
import {genetateUUID} from '../../redux/utils';
import {allItems as items} from '../../products.config';
import Layout from '../layOut';
import {ActivityIndicator, Button, List} from 'react-native-paper';
import useAuthService from '../../hooks/useAuthServices';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  categoryListRequested,
  productListRequested,
  setCurrentCategory,
} from '../../redux/silces/product.slice';
import CustomModal from '../commonModal';

const HomePageComponent = ({navigation}: {navigation: any}) => {
  const {cartList, currentCart} = useSelector((state: RootState) => state.cart);
  const {categoryList, isLoading} = useSelector(
    (state: RootState) => state.product,
  );
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<
    'logout' | 'profile' | 'addDealer'
  >('profile');

  const [showMenu, setshowMenu] = useState(false);

  const handleButtonClick = (item: category) => {
    dispatch(updateCurrentCategory(item.name));
    dispatch(setCurrentCategory(item));
    const cartItem: ICart = {
      id: genetateUUID().toString(),
      totalAmount: '0',
      items: [],
    };

    if (currentCart.id === '') {
      dispatch(setInitialCurrentCart(cartItem));
    }
    dispatch(productListRequested(item?.id ?? ''));
    navigation.navigate('subproduct');
  };

  const filteredItems = categoryList.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const {handleLogOut} = useAuthService();

  const handleMenuItemClick = (type: 'logout' | 'profile' | 'addDealer') => {
    setshowMenu(false);
    setModalVisible(true);
    setModalType(type);
  };

  useEffect(() => {
    dispatch(categoryListRequested());
  }, []);

  return (
    <View style={{padding: 10, flex: 1}}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => setshowMenu(!showMenu)}>
          <Icon name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Kedia Polymers</Text>
      </View>
      {showMenu ? (
        <>
          <View
            style={{
              position: 'absolute',
              top: 60, // Adjust as needed
              left: '10%',
              right: 0,
              backgroundColor: 'white', // 'rgba(103, 80, 164, 0.95)',
              zIndex: 10, // Ensure the menu is above other elements
              elevation: 400,
              width: '60%',
              borderRadius: 20,
            }}>
            <List.Section>
              <List.Item
                title="My profile"
                titleStyle={{
                  color: 'black',
                }}
                left={() => (
                  <Icon
                    style={{paddingLeft: 10}}
                    name="account-circle"
                    size={24}
                    color={'black'}
                  />
                )}
                onPress={() => {
                  handleMenuItemClick('profile');
                }}
              />

              <List.Item
                title="Add new dealer"
                titleStyle={{
                  color: 'black',
                }}
                left={() => (
                  <Icon
                    style={{paddingLeft: 10}}
                    name="add-circle-outline"
                    size={24}
                    color={'black'}
                  />
                )}
                onPress={() => {
                  handleMenuItemClick('addDealer');
                }}
              />

              <List.Item
                title="Log out"
                titleStyle={{
                  color: 'black', // Text color
                }}
                left={() => (
                  <Icon
                    style={{paddingLeft: 10}}
                    name="logout"
                    size={24}
                    color={'black'}
                  />
                )}
                onPress={() => {
                  handleMenuItemClick('logout');
                }}
              />
            </List.Section>
          </View>
        </>
      ) : null}

      <CustomModal
        open={modalVisible}
        setOpen={setModalVisible}
        type={modalType}
      />

      <Layout headerText="Categories" navigation={() => {}} hideButton>
        <View style={{flex: 1}}>
          <ScrollView>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                style={{marginTop: '50%', marginHorizontal: 10}}
              />
            ) : (
              <ListWithIcons
                items={filteredItems}
                navigation={navigation}
                handleClick={handleButtonClick}
              />
            )}
          </ScrollView>
        </View>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginLeft: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    color: 'black',
  },
});

export default HomePageComponent;
