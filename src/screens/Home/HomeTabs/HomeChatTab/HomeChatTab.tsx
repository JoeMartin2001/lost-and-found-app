import {NavigationProp} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppParamList} from '../../../../navigation/AppParamList';

const rooms = [
  {
    _id: '1',
    title: 'Chat 1',
    avatar_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&usqp=CAU',
    last_message: 'Ha boldi tel qilaman!',
  },
  {
    _id: '2',
    title: 'Chat 2',
    avatar_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&usqp=CAU',
    last_message: 'Qayerdansiz aka?',
  },
];

const HomeChatTab = ({
  navigation,
}: {
  navigation: NavigationProp<AppParamList, 'Home'>;
}) => {
  const renderItems = ({
    item,
  }: {
    item: {
      avatar_url: string;
      title: string;
      _id: string;
      last_message: string;
    };
  }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatRoom', {id: item._id})}>
      <ListItem bottomDivider>
        <Avatar source={{uri: item.avatar_url}} />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.last_message}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <FlatList
        data={rooms}
        renderItem={renderItems}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default HomeChatTab;
