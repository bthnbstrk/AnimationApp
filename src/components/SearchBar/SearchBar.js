import React from 'react';
import {View, TextInput} from 'react-native';

import styles from './SearchBar.style';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Search..." onChangeText={props.onSearch} />
    </View>
  );
};

export default SearchBar;
