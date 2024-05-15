import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, RadioButton} from 'react-native-paper';

import HelperText from '../components/helperText';

import Layout from '../components/layOut';

const AddBillingAddress = ({navigation}: {navigation: any}) => {
  const [appointmentDetails, setAppointmentDetails] = useState<any>({});

  const handleNavigation = () => {
    navigation.navigate('cart');
  };
  return (
    <Layout navigation={handleNavigation} headerText="Add billing address">
      <ScrollView>
        <TextInput
          maxLength={50}
          autoFocus
          value={appointmentDetails?.fullname}
          label="Full name"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, fullname: text});
          }}
          style={styles.input}
          placeholder="Jhon Doe"
          placeholderTextColor="gray"
          activeOutlineColor={'red'}
        />
        <HelperText
          text="This field is required"
          type="error"
          show={appointmentDetails?.fullname?.length === 0}
        />

        <TextInput
          activeOutlineColor={'red'}
          maxLength={10}
          value={appointmentDetails?.patientPhone}
          label="Phone"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, patientPhone: text});
          }}
          style={styles.input}
          placeholder="1234567890"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={appointmentDetails?.phone?.length === 0}
        />

        <TextInput
          activeOutlineColor={'red'}
          maxLength={10}
          value={appointmentDetails?.patientPhone}
          label="Phone"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, patientPhone: text});
          }}
          style={styles.input}
          placeholder="1234567890"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={appointmentDetails?.phone?.length === 0}
        />
        <TextInput
          activeOutlineColor={'red'}
          maxLength={10}
          value={appointmentDetails?.patientPhone}
          label="Phone"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, patientPhone: text});
          }}
          style={styles.input}
          placeholder="1234567890"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={appointmentDetails?.phone?.length === 0}
        />
        <TextInput
          activeOutlineColor={'red'}
          maxLength={200}
          value={appointmentDetails?.adddressOne}
          label="Address 1"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, adddressOne: text});
          }}
          style={styles.input}
          placeholder="Address line 1"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={appointmentDetails?.adddressOne?.length === 0}
        />
        <TextInput
          activeOutlineColor={'red'}
          maxLength={100}
          value={appointmentDetails?.adddressTwo}
          label="Phone"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, addressTwo: text});
          }}
          style={styles.input}
          placeholder="Address line 2"
          placeholderTextColor="gray"
        />

        <TextInput
          activeOutlineColor={'red'}
          maxLength={100}
          value={appointmentDetails?.city}
          label="City"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, city: text});
          }}
          style={styles.input}
          placeholder="Kolkata"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={appointmentDetails?.city?.length === 0}
        />

        <TextInput
          activeOutlineColor={'red'}
          maxLength={6}
          value={appointmentDetails?.pinCode}
          label="PIN code"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, pinCode: text});
          }}
          style={styles.input}
          placeholder="700001"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={appointmentDetails?.pinCode?.length === 0}
        />

        <TextInput
          activeOutlineColor={'red'}
          maxLength={10}
          value={appointmentDetails?.state}
          label="State"
          mode="outlined"
          onChangeText={(text: string) => {
            setAppointmentDetails({...appointmentDetails, state: text});
          }}
          style={styles.input}
          placeholder="West Bengal"
          placeholderTextColor="gray"
        />
        <HelperText
          text="This field is required"
          type="error"
          show={appointmentDetails?.state?.length === 0}
        />

        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('billingscreen');
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 30,
  },
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
