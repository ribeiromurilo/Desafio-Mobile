import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logoImage from '../../assets/img-1.jpg';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <Image source={logoImage} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.buttonText}>Novas Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CompletedTasks')}>
        <Text style={styles.buttonText}>Concluídas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7738c7',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;