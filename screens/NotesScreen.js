import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotesScreen() {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem('notes');
    if (saved) setNotes(JSON.parse(saved));
  };

  const saveNotes = async (newNotes) => {
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (!text.trim()) return;
    const updated = [...notes, text];
    saveNotes(updated);
    setText('');
  };

  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    saveNotes(updated);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter note"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Note" onPress={addNote} />

      <FlatList
        data={notes}
        renderItem={({ item, index }) => (
          <TouchableOpacity onLongPress={() => deleteNote(index)}>
            <Text style={styles.note}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  note: { padding: 10, marginVertical: 6, backgroundColor: '#eee' }
});
