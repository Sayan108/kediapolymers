import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useAuthService from '../hooks/useAuthServices';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux';
import {addNewProductInListRequested} from '../redux/silces/product.slice';
import NetworkLogger from 'react-native-network-logger/lib/typescript/src/components/NetworkLogger';

interface CustomModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: 'logout' | 'profile' | 'addDealer' | 'addProduct';
}

const CustomModal: React.FC<CustomModalProps> = ({open, setOpen, type}) => {
  const {handleLogOut} = useAuthService();
  const userData = useSelector((state: RootState) => state.auth.userDetails);
  const category = useSelector(
    (state: RootState) => state.product.currentCategory,
  );
  const [newProductData, setnewProductData] = useState({
    title: '',
    unitPrice: '0',
    categoryId: category?.id,
    description: '',
  });

  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    // handle logout logic
    handleLogOut();
    setOpen(false);
  };

  const handleAddDealer = () => {
    // handle add dealer logic
    setOpen(false);
  };

  const handleAddNewProduct = () => {
    // handle add dealer logic
    dispatch(addNewProductInListRequested([newProductData]));
    setOpen(false);
  };

  const handleTextChange = (title: string, value: string) => {
    setnewProductData({...newProductData, [title]: value});
  };

  const renderContent = () => {
    switch (type) {
      case 'logout':
        return (
          <View>
            <Text style={styles.modalHeader}>Logout</Text>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleLogoutClick}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setOpen(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'profile':
        return (
          <View>
            <Text style={styles.modalHeader}>My profile</Text>
            <TextInput
              style={styles.textInput}
              value={userData?.fullname ?? 'No name provided'}
              editable={false}
              placeholder="Name"
            />
            <TextInput
              style={styles.textInput}
              value={
                userData?.email ?? userData?.userName ?? 'No email provided'
              }
              editable={false}
              placeholder="Email"
            />
            <TextInput
              style={styles.textInput}
              value={userData?.phoneNumber ?? 'No mobile number provided'}
              editable={false}
              placeholder="Phone Number"
            />
          </View>
        );
      case 'addDealer':
        return (
          <View>
            <Text style={styles.modalHeader}>Add new dealer</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Phone Number"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddDealer}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        );

      case 'addProduct':
        return (
          <View>
            <Text style={styles.modalHeader}>Add new product</Text>
            <TextInput
              nativeID="title"
              style={styles.textInput}
              placeholder="Product name*"
              placeholderTextColor="#aaa"
              value={newProductData.title}
              onChangeText={value => handleTextChange('title', value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Price*"
              placeholderTextColor="#aaa"
              inputMode="numeric"
              value={newProductData.unitPrice}
              onChangeText={value => handleTextChange('unitPrice', value)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Description(optional)"
              placeholderTextColor="#aaa"
              value={newProductData.description}
              onChangeText={value => handleTextChange('description', value)}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddNewProduct}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={styles.closeIcon}>
            <Icon name="close" size={24} color="#333" />
          </TouchableOpacity>
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  textInput: {
    width: 300,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  submitButton: {
    backgroundColor: 'rgba(103, 80, 164, 1)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomModal;
