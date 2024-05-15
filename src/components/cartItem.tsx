import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RadioButton, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native';

const CartItem = (props: any) => {
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
  useEffect(() => {
    setQuantity(parseInt(item.quantity ?? 1));
  }, []);

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
        {showDropDown ? (
          <View style={styles.dropdownList}>
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
        ) : (
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => {
              setShowDropDown(!showDropDown);
            }}>
            <Button>
              <Text style={styles.dropdownText}>
                {selectedItem || 'Choose dimension'}
              </Text>
            </Button>
          </TouchableOpacity>
        )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
    borderBottomColor: 'gray',
    borderWidth: 1,
    borderColor: 'black',
    width: 348,
    marginBottom: 15,
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
    width: '40%',
    height: 'auto',
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
    width: '40%', // Align with the dropdown width
    height: 45, // Match the height with the dropdown
  },
  counterButton: {
    width: 45, // Ensure button is wide enough for touch interaction
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterInput: {
    flex: 20000,
    justifyContent: 'space-between',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 6,
  },

  dropdownList: {
    position: 'relative',
    top: 30,
    width: '60%',
    height: '100%',
    backgroundColor: 'rgba(103, 80, 164,0.25)',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1000,
    color: 'rgba(103, 80, 164,1)',
  },
  dropdownItem: {
    color: 'rgba(103, 80, 164,1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  dropdownItemText: {
    marginLeft: 8,
    color: 'black',
  },
  price: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});

export default CartItem;
