import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import CompletedTasksScreen from './screens/CompletedTasksScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              return <AntDesign name={iconName} size={size} color={color} />;
            } else if (route.name === 'AddTask') {
              iconName = 'format-list-bulleted';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'CompletedTasks') {
              iconName = 'check';
              return <AntDesign name={iconName} size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#7738c7',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="AddTask" component={AddTaskScreen} options={{ tabBarLabel: 'Novas Tarefas' }} />
        <Tab.Screen name="CompletedTasks" component={CompletedTasksScreen} options={{ tabBarLabel: 'Concluídas' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
