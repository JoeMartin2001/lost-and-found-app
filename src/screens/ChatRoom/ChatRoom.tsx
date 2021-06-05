import {NavigationProp, Route} from '@react-navigation/core';
import React, {ComponentType, useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {AppParamList} from '../../navigation/AppParamList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {socketIO} from '../../common/socketIO';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatRoom = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AppParamList, 'ChatRoom'>;
  route: Route<'ChatRoom', {id: string}>;
}) => {
  const [text, setText] = useState('');
  const scrollViewRef = useRef<any>();

  const handleSendMessage = async () => {
    socketIO.emit('new_message', {msg: text, id: route.params.id});
    setText('');
  };

  //   const renderChatList = (item: any) => {
  //     const isFriend = () => item.user._id === userId

  //     return (
  //         <View style={{...styles.messageView, flexDirection: !isFriend() ? 'row-reverse': 'row'}} key={item._id}>
  //             <View style={styles.avatarView}>
  //                 <FontAwesome name="user-circle" size={30} color="grey" />
  //             </View>
  //             <View style={{
  //                 ...styles.messageItemView,
  //                 backgroundColor: isFriend() ? appColors.transparent: appColors.secondary
  //             }}>
  //                 <Text style={{color: isFriend() ? 'grey' : 'grey'}}>{item.user.name}</Text>
  //                 <Text style={{color: isFriend() ? 'black' : 'white'}}>{item.msg}</Text>
  //             </View>
  //         </View>
  //     )
  // }

  return (
    <View style={styles.main}>
      <View style={styles.main}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({animated: true})
          }>
          {/* {chat.map((item) => renderChatList(item))} */}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Сообщение"
          style={styles.messageInput}
          value={text}
          onChangeText={value => setText(value)}
          selectionColor="#000000"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={{padding: 5}}
          disabled={!text}>
          <Ionicons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  inputContainer: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey',
    paddingRight: 10,
  },
  messageInput: {
    marginHorizontal: 10,
    height: 50,
    flex: 1,
    fontSize: 18,
    backgroundColor: 'lightgrey',
  },
});

export default ChatRoom;
