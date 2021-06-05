import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const SplashScreen = () => {
  return (
    <View style={styles.main}>
      <ActivityIndicator color="orange" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
