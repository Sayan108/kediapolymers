import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import HelperText from '../components/helperText';
import Layout from '../components/layOut';
import {useDispatch, useSelector} from 'react-redux';
import {clearCart, clearCurrentCart} from '../redux/silces/cart.slice';
import {RootState} from '../redux';

const AddBillingAddress = ({navigation}: {navigation: any}) => {
  const [address, setaddress] = useState<any>({});
  const [touchedFields, setTouchedFields] = useState<any>({});
  const dispatch = useDispatch();

  const {currentCart} = useSelector((state: RootState) => state.cart);

  const handleNavigation = () => {
    navigation.navigate('cart');
  };

  const handleBlur = (field: string) => {
    setTouchedFields({...touchedFields, [field]: true});
  };

  return (
    <Layout navigation={handleNavigation} headerText="Add billing address">
      <ScrollView>
        <TextInput
          maxLength={50}
          autoFocus
          value={address?.fullname}
          label="Full name"
          mode="outlined"
          onChangeText={(text: string) => {
            setaddress({...address, fullname: text});
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
            setaddress({...address, patientPhone: text});
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
            setaddress({...address, addressOne: text});
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
            setaddress({...address, addressTwo: text});
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
            setaddress({...address, city: text});
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
            setaddress({...address, pinCode: text});
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
            setaddress({...address, state: text});
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
          onPress={() => {
            navigation.navigate('billingscreen');
            // dispatch(clearCart());
          }}
          style={styles.button}
          labelStyle={styles.buttonLabel}>
          Next
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
});

export default AddBillingAddress;
