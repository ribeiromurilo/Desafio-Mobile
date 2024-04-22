import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import CompletedTasksScreen from './src/screens/CompletedTasksScreen';
import IncompleteTasksScreen from './src/screens/IncompleteTasksScreen';
import MemberScreen from './src/screens/MemberScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} />
        <Stack.Screen name="IncompleteTasks" component={IncompleteTasksScreen} />
        <Stack.Screen name="Member" component={MemberScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
