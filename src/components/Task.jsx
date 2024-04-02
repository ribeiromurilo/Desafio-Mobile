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
      <View style={styles.circular}></View>
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
    backgroundColor: '#c4aae6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedSquare: {
    opacity: 1,
    backgroundColor: '#7738c7',
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
    borderColor: '#7738c7',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;