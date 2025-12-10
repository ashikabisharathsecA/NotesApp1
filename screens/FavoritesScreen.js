import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritesScreen() {
  const [text, setText] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  };

  const saveFavorites = async (newFav) => {
    setFavorites(newFav);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFav));
  };

  const addFavorite = () => {
    if (!text.trim()) return;
    const updated = [...favorites, text];
    saveFavorites(updated);
    setText('');
  };

  const removeFavorite = (index) => {
    const updated = favorites.filter((_, i) => i !== index);
    saveFavorites(updated);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter item"
        style={styles.input}
        value={text}
        onChangeText={setText}
      />

      <Button title="Add Favorite" onPress={addFavorite} />

      <FlatList
        data={favorites}
        renderItem={({ item, index }) => (
          <TouchableOpacity onLongPress={() => removeFavorite(index)}>
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  item: { padding: 10, marginVertical: 6, backgroundColor: '#ddd' }
});
