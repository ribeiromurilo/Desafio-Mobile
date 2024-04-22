import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MemberScreen = () => {
  return (
    <View style={[styles.container, styles.whiteBackground]}>
      <FontAwesome name="user" size={30} color="black" style={styles.icon} />
      <Text style={styles.text}>Murilo Ribeiro Valério da Silva</Text>
      <Text style={styles.text}>2TDSPF - RM550858</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 17,
  },
  icon: {
    marginBottom: 10,
  },
});

export default MemberScreen;
