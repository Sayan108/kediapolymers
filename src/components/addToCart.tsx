import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddToCartCard = (props: any) => {
  const dropdown = [
    '10 cm',
    '20 cm',
    '30 cm',
    '40 cm',
    '50 cm',
    '10 cm',
    '20 cm',
    '30 cm',
    '40 cm',
    '50 cm',
  ];
  const {item} = props;
  const [quantity, setQuantity] = useState<any>(item?.quantity ?? 1);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  console.log(item);

  const handleIncrement = () => {
    setQuantity((prevQuantity: any) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity: any) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1,
    );
  };

  const handleQuantityChange = (text: string) => {
    if (/^\d+$/.test(text)) {
      setQuantity(parseInt(text));
    } else if (text === '') {
      setQuantity(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
          <Icon name="list-alt" size={24} color="black" />
        </View>
        <Text style={styles.productName}>
          {item.productName ?? 'Product Name'}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowDropDown(true)}>
          <Text style={styles.dropdownText}>
            {selectedItem || 'Choose dimension'}
          </Text>
        </TouchableOpacity>
        <View style={styles.counterContainer}>
          <TextInput
            value={quantity.toString()}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
            style={styles.counterInput}
          />
          {/* <TouchableOpacity
            onPress={handleDecrement}
            style={styles.counterButton}>
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.counterButton}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={styles.price}>{item?.price ?? '$10'}</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => console.log('Button Pressed')}>
          Add to Cart
        </Button>
      </View>

      <Modal
        transparent={true}
        visible={showDropDown}
        onRequestClose={() => setShowDropDown(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDropDown(false)}>
          <View style={styles.modalContainer}>
            <RadioButton.Group
              onValueChange={newValue => {
                setSelectedItem(newValue);
                setShowDropDown(false);
              }}
              value={selectedItem}>
              {dropdown?.map((item, index) => (
                <View key={index} style={styles.dropdownItem}>
                  <RadioButton value={item} color={'black'} />
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderColor: 'black',
    width: 348,
    borderWidth: 1,
    backgroundColor: 'rgba(103, 80, 164,0.1)',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  dropdownContainer: {
    flex: 1,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    height: 45,
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: 'black',
    textAlign: 'center',
  },
  counterText: {
    fontSize: 24,
    justifyContent: 'space-between',
    color: 'black',
    alignSelf: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    overflow: 'hidden',
    width: '40%',
    height: 45,
  },
  counterButton: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 6,
  },
  price: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    paddingRight: 20,
    alignSelf: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
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
});

export default AddToCartCard;
