import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { database, ref, onValue } from "../firebase";
import { AntDesign } from '@expo/vector-icons';
import Task from '../components/Task';

const CompletedTasksScreen = ({ navigation }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadCompletedTasks();
    });

    return unsubscribe;
  }, [navigation]);

  const loadCompletedTasks = async () => {
    try {
      const tasksRef = ref(database, 'tasks');
      onValue(tasksRef, (snapshot) => {
        const tasks = snapshot.val();
        if (tasks !== null) {
          const completed = tasks.filter(task => task.completed); // Tarefas concluídas
          setCompletedTasks(completed);
        }
      });
    } catch (error) {
      console.error('Erro ao carregar as tarefas concluídas:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Task text={item.text} completed={item.completed} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <AntDesign name="checkcircleo" size={24} color="black" />
        <Text style={styles.title}>Tarefas Concluídas</Text>
      </View>
      <FlatList
        data={completedTasks}
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

export default CompletedTasksScreen;
