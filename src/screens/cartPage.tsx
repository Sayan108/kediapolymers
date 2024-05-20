import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CartItem from '../components/cartItem';
import {Button, Modal, TextInput} from 'react-native-paper';
import Layout from '../components/layOut';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {addNewOrderInList, setCurrentOrder} from '../redux/silces/order.slice';
import {addNewCartInList} from '../redux/silces/cart.slice';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'; // Correct import for Pressable

const Cartpage = ({navigation}: {navigation: any}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [draftName, setDraftName] = useState('');
  const dispatch = useDispatch();
  const {currentCart} = useSelector((state: RootState) => state.cart);

  const handleNavigation = () => {
    navigation.navigate('subproduct');
  };

  return (
    <Layout navigation={handleNavigation} headerText="Cart page">
      {currentCart.items.length === 0 ? (
        <Text>No cart item found</Text>
      ) : (
        <ScrollView>
          <View style={{alignItems: 'center', paddingTop: 25}}>
            {currentCart?.items?.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <CartItem item={item} />
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => {
                dispatch(addNewOrderInList(currentCart));
                // dispatch(setCurrentOrder())
                navigation.navigate('billingaddress');
              }}>
              {'Confirm order'}
            </Button>

            <Button
              style={styles.button}
              mode="outlined"
              onPress={() => {
                setShowDropDown(true);
                // dispatch(addNewCartInList(currentCart));
              }}>
              {'Save as draft'}
            </Button>
          </View>
          <Modal
            style={{backgroundColor: 'white'}}
            visible={showDropDown}
            onDismiss={() => setShowDropDown(false)}
            contentContainerStyle={styles.modalContent}>
            <TextInput
              maxLength={50}
              autoFocus
              value={draftName}
              label="Draft name"
              mode="outlined"
              onChangeText={(text: string) => {
                setDraftName(text);
              }}
              placeholder="Draft one"
              placeholderTextColor="gray"
              activeOutlineColor={'red'}
            />
            <Button
              onPress={() => {
                setShowDropDown(false);
                navigation.navigate('cart');
                dispatch(addNewCartInList(currentCart));
              }}>
              Save{' '}
            </Button>
          </Modal>
        </ScrollView>
      )}
    </Layout>
  );
};

export default Cartpage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cartItem: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    width: '80%',
    marginBottom: 8,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
