import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsScreenRouteProp;
}

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Check if the movie and movie.image exist before rendering */}
      {movie?.image?.original ? (
        <Image source={{ uri: movie.image.original }} style={styles.image} />
      ) : (
        <Text style={styles.errorText}>Image not available</Text>
      )}
      <Text style={styles.title}>{movie?.name || 'No title available'}</Text>
      <Text style={styles.summary}>
        {movie?.summary
          ? movie.summary.replace(/<[^>]*>?/gm, '')
          : 'No summary available'}
      </Text>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ffffff', // Set text color to white for better contrast
  },
  summary: {
    fontSize: 16,
    color: '#cccccc', // Set summary text color to light gray
  },
  errorText: {
    fontSize: 18,
    color: 'red', // Display error message in red
    textAlign: 'center',
    marginVertical: 10,
  },
});
