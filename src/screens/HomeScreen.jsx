import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import logoImage from '../../assets/img-1.png';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>To Do List</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.buttonText}>Nova Tarefa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CompletedTasks')}>
        <Text style={styles.buttonText}>Tarefas Concluídas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IncompleteTasks')}>
        <Text style={styles.buttonText}>Tarefas Pendentes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Member')}>
        <Text style={styles.buttonText}>Membro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
