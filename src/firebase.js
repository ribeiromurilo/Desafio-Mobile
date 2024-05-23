import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, remove, onValue, update } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA-obsbnX-4BTRvvF_O0xa4BaQwWipDJn4",
    authDomain: "tasks-1d597.firebaseapp.com",
    projectId: "tasks-1d597",
    storageBucket: "tasks-1d597.appspot.com",
    messagingSenderId: "658506531551",
    appId: "1:658506531551:web:a75bed8883dc8710b1df6a",
    measurementId: "G-MQTF1JBX52"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

const saveTask = async (task) => {
  try {
    const taskRef = push(ref(database, 'tasks'));
    await update(taskRef, task);
    return taskRef.key;
  } catch (error) {
    console.error('Erro ao salvar a tarefa:', error);
  }
};

const deleteTask = async (taskId) => {
  try {
    await remove(ref(database, `tasks/${taskId}`));
  } catch (error) {
    console.error('Erro ao excluir a tarefa:', error);
  }
};

const listTasks = async () => {
  try {
    const tasksRef = ref(database, 'tasks');
    const snapshot = await onValue(tasksRef);
    const tasks = [];
    snapshot.forEach((childSnapshot) => {
      tasks.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    return tasks;
  } catch (error) {
    console.error('Erro ao listar as tarefas:', error);
    return [];
  }
};

const updateTask = async (taskId, task) => {
  try {
    await update(ref(database, `tasks/${taskId}`), task);
  } catch (error) {
    console.error('Erro ao atualizar a tarefa:', error);
  }
};

export { saveTask, deleteTask, listTasks, updateTask };
