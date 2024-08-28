import React, { useState } from 'react';
import { View, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { Movie } from '../types';
import { RootStackParamList } from '../App';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;

interface Props {
  navigation: SearchScreenNavigationProp;
}

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);

  const searchMovies = (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      axios.get(`https://api.tvmaze.com/search/shows?q=${text}`)
        .then(response => setResults(response.data.map((item: any) => item.show)))
        .catch(error => console.error(error));
    }
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.movieContainer} onPress={() => navigation.navigate('Details', { movie: item })}>
      {item.image?.medium ? (
        <Image source={{ uri: item.image.medium }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImageContainer]}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.summary}>
          {item.summary ? item.summary.replace(/<[^>]*>?/gm, '') : 'No summary available'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        value={query}
        onChangeText={searchMovies}
        style={styles.searchBar}
      />
      <FlatList
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMovie}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumbnail: {
    width: 100,
    height: 150,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#ffffff',
    fontSize: 14,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  summary: {
    marginTop: 5,
    color: '#cccccc',
  },
});
