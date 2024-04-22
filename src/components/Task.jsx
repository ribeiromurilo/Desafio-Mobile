import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Task = ({ text, completed }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={[styles.square, completed && styles.completedSquare]}>
          {completed && <AntDesign name="check" size={16} color="white" />}
        </View>
        <Text style={[styles.itemText, completed && styles.completedText]}>{text}</Text>
      </View>
      <View style={[styles.circular, completed && styles.completedCircularBorder]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#E8E8E8',
    opacity: 0.7,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedSquare: {
    opacity: 1,
    backgroundColor: '#ffe300',
  },
  itemText: {
    maxWidth: '80%',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.4,
  },
  circular: {
    width: 12,
    height: 12,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  completedCircularBorder: {
    borderColor: '#ffe300',
  },
});

export default Task;
