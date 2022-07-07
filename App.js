import * as React from 'react';
import {useState} from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import SearchBar from './src/components/SearchBar';
import DATA from './src/data/data.json';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const BG_IMAGE =
  'https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [list, setList] = useState(DATA);
  const handleSearch = text => {
    const filteredList = DATA.filter(song => {
      const searchedText = text.toLowerCase();
      const currentTitle = song.title.toLowerCase();

      return currentTitle.indexOf(searchedText) > -1;
    });

    setList(filteredList);
  };

  return (
    <View style={styles.setFlex}>
      <Image
        source={{
          uri: BG_IMAGE,
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={5}
      />
      <SearchBar onSearch={handleSearch} />
      <Animated.FlatList
        data={list}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={[
                {
                  opacity,
                  transform: [{scale}],
                },
                styles.card,
              ]}>
              <Image source={{uri: item.imageUrl}} style={styles.albumImage} />
              <View style={styles.setFlex}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
                <Text style={styles.year}>{item.year}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  setFlex: {
    flex: 1,
  },
  albumImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
  },
  artist: {
    fontSize: 18,
    opacity: 0.7,
  },
  year: {
    fontSize: 18,
    color: '#121212',
  },
  card: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: 'rgba(255, 255, 255,0.8)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
});
