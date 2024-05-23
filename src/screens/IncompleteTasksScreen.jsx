import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { database, ref, onValue } from "../firebase";
import { AntDesign } from '@expo/vector-icons';
import Task from '../components/Task';

const IncompleteTasksScreen = ({ navigation }) => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadIncompleteTasks();
    });

    return unsubscribe;
  }, [navigation]);

  const loadIncompleteTasks = async () => {
    try {
      const tasksRef = ref(database, 'tasks');
      onValue(tasksRef, (snapshot) => {
        const tasks = snapshot.val();
        if (tasks !== null) {
          const incomplete = tasks.filter(task => !task.completed); // Tarefas não concluídas
          setIncompleteTasks(incomplete);
        }
      });
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Task text={item.text} completed={item.completed} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <AntDesign name="exclamationcircleo" size={24} color="black" />
        <Text style={styles.title}>Tarefas Não Concluídas</Text>
      </View>
      <FlatList
        data={incompleteTasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.tasksWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tasksWrapper: {
    flex: 1,
  },
});

export default IncompleteTasksScreen;
