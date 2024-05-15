import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using Material Icons for icons

export interface Item {
  id: number;
  text: string;
  iconName: string;
}

interface Props {
  items: Item[];
  navigation?: any;
}

const ListItem: React.FC<{item: Item; navigation: any}> = ({
  item,
  navigation,
}) => (
  <View style={styles.itemContainer}>
    <Pressable onPress={() => navigation.navigate('subproduct')}>
      <View style={styles.item}>
        <Icon name={item.iconName} size={24} color="black" />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </Pressable>
  </View>
);

const ListWithIcons: React.FC<Props> = ({items, navigation}) => (
  <View style={styles.container}>
    {items.map(item => (
      <ListItem key={item.id} item={item} navigation={navigation} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: '45%', // Adjust as needed
    backgroundColor: 'rgba(103, 80, 164, 0.25)',
    marginBottom: 56,
    borderRadius: 8,
    height: 56,
  },
  item: {
    height: 56,
    width: 136,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginLeft: 10,
    color: 'black',
  },
});

export default ListWithIcons;