import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import ListWithIcons, {Item} from './listWithIcons';

const HomePageComponent = ({navigation}: {navigation: any}) => {
  const [searchText, setSearchText] = useState('');

  const items: Item[] = [
    {id: 1, text: 'Agriculture', iconName: 'accessibility'},
    {id: 2, text: 'CPVC Pro', iconName: 'alarm'},
    {id: 3, text: 'Foam core', iconName: 'alarm'},
    {id: 4, text: 'Drain pro', iconName: 'build'},
    {id: 5, text: 'Drain pro', iconName: 'build'},
    {id: 6, text: 'Foam core', iconName: 'camera'},
  ];

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
      <ListWithIcons items={items} navigation={navigation} />
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
