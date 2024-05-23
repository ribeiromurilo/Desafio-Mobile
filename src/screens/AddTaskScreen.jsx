import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { database, ref, update, onValue } from "../firebase";
import Task from '../components/Task';

const AddTaskScreen = ({ navigation }) => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [clickedTaskIndex, setClickedTaskIndex] = useState(null);
  const [lastPress, setLastPress] = useState(0);

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await update(ref(database, 'tasks'), tasks);
    } catch (error) {
      console.error('Erro ao salvar as tarefas:', error);
    }
  };

  const loadTasks = async () => {
    try {
      if (taskItems.length === 0) { // Verifica se já existem tarefas carregadas localmente
        const tasksRef = ref(database, 'tasks');
        onValue(tasksRef, (snapshot) => {
          const tasks = snapshot.val();
          if (tasks !== null) {
            setTaskItems(tasks);
          }
        });
      }
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  const handleAddTask = () => {
    if (task.trim() === '') {
      return;
    }

    const newTaskItems = [...taskItems, { text: task, completed: false }];
    setTaskItems(newTaskItems);
    saveTasks(newTaskItems);
    setTask('');
  };

  const toggleTaskCompletion = async (index) => {
    const newTaskItems = [...taskItems];
    newTaskItems[index].completed = !newTaskItems[index].completed;
    try {
      await update(ref(database, 'tasks'), newTaskItems);
    } catch (error) {
      console.error('Erro ao atualizar a tarefa:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    const newTaskItems = [...taskItems];
    newTaskItems.splice(index, 1);
    setTaskItems(newTaskItems);
    saveTasks(newTaskItems); // Salva as tarefas após a exclusão
  };

  const handlePressTask = async (index) => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;

    if (clickedTaskIndex === index && now - lastPress < DOUBLE_PRESS_DELAY) {
      // Remover a tarefa se já estiver concluída
      if (taskItems[index].completed) {
        await handleDeleteTask(index);
      }
      setClickedTaskIndex(null);
    } else {
      toggleTaskCompletion(index);
      setClickedTaskIndex(index);
      setLastPress(now);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handlePressTask(index)} onLongPress={() => handleDeleteTask(index)}>
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
        keyExtractor={(item, index) => index.toString()}
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
