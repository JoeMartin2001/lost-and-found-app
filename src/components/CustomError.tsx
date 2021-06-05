import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {QueryObserverResult, RefetchOptions} from 'react-query';

const CustomError = ({refresh}: {refresh: () => Promise<void>}) => {
  return (
    <View style={styles.main}>
      <Feather name="wifi-off" size={50} />
      <Text style={{marginTop: 5, marginBottom: 15, fontSize: 16}}>
        Network Error!
      </Text>
      <TouchableOpacity style={styles.refreshButton} onPress={() => refresh()}>
        <Text>Refresh!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButton: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default CustomError;
