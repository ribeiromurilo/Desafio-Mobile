import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Task from '../components/Task';
import { saveTask, listTasks, updateTask, deleteTask } from '../firebase';
import axios from 'axios';

const AddTaskScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [clickedTaskIndex, setClickedTaskIndex] = useState(null);
  const [lastPress, setLastPress] = useState(0);

  useEffect(() => {
    loadTasksFromFirebase();
    fetchApiData();
  }, []);

  const loadTasksFromFirebase = async () => {
    try {
      const tasks = await listTasks();
      setTaskItems(tasks);
    } catch (error) {
      console.error('Erro ao carregar as tarefas do Firebase:', error);
    }
  };

  const fetchApiData = async () => {
    try {
      const response = await axios.get('https://api.example.com/tasks');
      console.log('API Data:', response.data);
      // Process the API response and update state as needed
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim() === '') {
      return;
    }

    const taskId = await saveTask({ text: task, completed: false });
    if (taskId) {
      setTaskItems([...taskItems, { id: taskId, text: task, completed: false }]);
      setTask('');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const updatedTasks = taskItems.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskItems(updatedTasks);
    await updateTask(taskId, { completed: !taskItems.find(item => item.id === taskId).completed });
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = await new Promise((resolve) =>
      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza de que deseja excluir esta tarefa?',
        [
          { text: 'Cancelar', onPress: () => resolve(false), style: 'cancel' },
          { text: 'Excluir', onPress: () => resolve(true) }
        ],
        { cancelable: true }
      )
    );

    if (confirmed) {
      const updatedTasks = taskItems.filter(task => task.id !== taskId);
      setTaskItems(updatedTasks);
      await deleteTask(taskId);
    }
  };

  const handlePressTask = (taskId) => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;

    if (clickedTaskIndex === taskId && now - lastPress < DOUBLE_PRESS_DELAY) {
      handleDeleteTask(taskId);
      setClickedTaskIndex(null);
    } else {
      toggleTaskCompletion(taskId);
      setClickedTaskIndex(taskId);
      setLastPress(now);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressTask(item.id)} onLongPress={() => handleDeleteTask(item.id)}>
      <Task text={item.text} completed={item.completed} />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.titleWrapper}>
        <AntDesign name="bars" size={24} color="black" />
        <Text style={styles.title}>Adicionar Tarefa</Text>
      </View>
      <FlatList
        data={taskItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.tasksWrapper}
      />
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a tarefa"
            onChangeText={(text) => setTask(text)}
            value={task}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  inputWrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#E8EAED',
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#ffe300',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddTaskScreen;
