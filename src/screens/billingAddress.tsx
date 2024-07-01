import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  RadioButton,
  ActivityIndicator,
} from 'react-native-paper';
import HelperText from '../components/helperText';
import Layout from '../components/layOut';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import useApiservices from '../hooks/useApiCalls';
import {addNewOrderInIListRequested} from '../redux/silces/order.slice';

interface NavigationProps {
  navigation: any;
}

interface Address {
  fullname?: string;
  patientPhone?: string;
  addressOne?: string;
  addressTwo?: string;
  city?: string;
  pinCode?: string;
  state?: string;
}

const roleid = '93c9c3fa-edc4-4c28-b79b-c0ac28d916fe';

const AddBillingAddress: React.FC<NavigationProps> = ({navigation}) => {
  const [address, setAddress] = useState<Address>({});
  const [dealer, setdealer] = useState<any>(null);
  const [touchedFields, setTouchedFields] = useState<{[key: string]: boolean}>(
    {},
  );
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const {userList, loading, fetchUserList} = useApiservices();
  const {currentCart} = useSelector((state: RootState) => state.cart);

  const handleNavigation = () => {
    navigation.navigate('cart');
  };

  const handleBlur = (field: string) => {
    setTouchedFields({...touchedFields, [field]: true});
  };

  const filteredNames = userList.filter(item =>
    item?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOrderClick = () => {
    navigation.navigate('billingscreen');
    console.log(currentCart);
    const orderItems = currentCart?.items?.map((item, index) => ({
      productId: item?.id,
      qty: item?.count,
      totalPrice: parseFloat(item?.totalPrice),
      productName: item?.productName,
    }));

    const orderPayLoad = {
      customerId: dealer?.userId,
      totalPrice: parseFloat(currentCart.totalAmount),
      billingAddress: JSON.stringify(address),
      orderItems,
    };
    console.log(JSON.stringify(orderPayLoad));

    dispatch(addNewOrderInIListRequested(orderPayLoad));
  };

  useEffect(() => {
    fetchUserList(roleid);
  }, []);

  return (
    <Layout navigation={handleNavigation} headerText="Add billing address">
      <Modal
        transparent={true}
        visible={showDropDown}
        onRequestClose={() => setShowDropDown(false)}>
        <View style={styles.modalContainer}>
          <TextInput
            label="Search"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            mode="outlined"
            style={styles.searchInput}
          />
          <ScrollView>
            <RadioButton.Group
              onValueChange={newValue => {
                setdealer(newValue);
                setShowDropDown(false);
              }}
              value={dealer?.fullname ?? 'Select dealer'}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <>
                  {filteredNames.map((item, index) => (
                    <View key={index} style={styles.dropdownItem}>
                      <RadioButton value={item} color={'black'} />
                      <Text style={styles.dropdownItemText}>
                        {item.fullname}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </RadioButton.Group>
          </ScrollView>
        </View>
      </Modal>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            setShowDropDown(true);
          }}>
          <View style={styles.dropdownButton}>
            <Text>
              {dealer && dealer?.fullname !== ''
                ? dealer?.fullname
                : 'Choose dealer'}
            </Text>
          </View>
        </TouchableOpacity>

        <TextInput
          maxLength={50}
          autoFocus
          value={address?.fullname}
          label="Full name"
          mode="outlined"
          onChangeText={(text: string) => {
            setAddress({...address, fullname: text});
          }}
          onBlur={() => handleBlur('fullname')}
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor="gray"
          activeOutlineColor="red"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.fullname && !address?.fullname}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={10}
          value={address?.patientPhone}
          label="Phone"
          mode="outlined"
          onChangeText={(text: string) => {
            setAddress({...address, patientPhone: text});
          }}
          onBlur={() => handleBlur('patientPhone')}
          style={styles.input}
          placeholder="1234567890"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.patientPhone && !address?.patientPhone}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={200}
          value={address?.addressOne}
          label="Address 1"
          mode="outlined"
          onChangeText={(text: string) => {
            setAddress({...address, addressOne: text});
          }}
          onBlur={() => handleBlur('addressOne')}
          style={styles.input}
          placeholder="Address line 1"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.addressOne && !address?.addressOne}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={100}
          value={address?.addressTwo}
          label="Address 2"
          mode="outlined"
          onChangeText={(text: string) => {
            setAddress({...address, addressTwo: text});
          }}
          onBlur={() => handleBlur('addressTwo')}
          style={styles.input}
          placeholder="Address line 2"
          placeholderTextColor="gray"
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={100}
          value={address?.city}
          label="City"
          mode="outlined"
          onChangeText={(text: string) => {
            setAddress({...address, city: text});
          }}
          onBlur={() => handleBlur('city')}
          style={styles.input}
          placeholder="Kolkata"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.city && !address?.city}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={6}
          value={address?.pinCode}
          label="PIN code"
          mode="outlined"
          onChangeText={(text: string) => {
            setAddress({...address, pinCode: text});
          }}
          onBlur={() => handleBlur('pinCode')}
          style={styles.input}
          placeholder="700001"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.pinCode && !address?.pinCode}
        />

        <TextInput
          activeOutlineColor="red"
          maxLength={100}
          value={address?.state}
          label="State"
          mode="outlined"
          onChangeText={(text: string) => {
            setAddress({...address, state: text});
          }}
          onBlur={() => handleBlur('state')}
          style={styles.input}
          placeholder="West Bengal"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={touchedFields.state && !address?.state}
        />

        <Button
          mode="contained"
          onPress={handleOrderClick}
          style={styles.button}
          labelStyle={styles.buttonLabel}>
          Add order
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'center',
    marginTop: 24,
    width: '80%',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemText: {
    marginLeft: 8,
    color: 'black',
  },
  modalContainer: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: 'black',
    zIndex: 10000,
    marginTop: 50,
  },
  searchInput: {
    marginBottom: 10,
  },
  dropdownButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default AddBillingAddress;
