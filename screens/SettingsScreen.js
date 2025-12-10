import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [username, setUsername] = useState('');
  const [toggle1, setToggle1] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedName = await AsyncStorage.getItem('username');
    const savedToggle = await AsyncStorage.getItem('toggle1');

    if (savedName) setUsername(savedName);
    if (savedToggle) setToggle1(JSON.parse(savedToggle));
  };

  const saveSettings = async () => {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('toggle1', JSON.stringify(toggle1));
  };

  return (
    <View style={styles.container}>
      <Text>Enter Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.row}>
        <Text>Enable Option:</Text>
        <Switch value={toggle1} onValueChange={setToggle1} />
      </View>

      <Button title="Save" onPress={saveSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 }
});
