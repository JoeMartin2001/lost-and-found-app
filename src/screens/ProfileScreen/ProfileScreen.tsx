import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FAB} from 'react-native-paper';
import {ListItem} from 'react-native-elements';

const menuItems = [
  {
    title: 'Phone Number',
    subTitle: '+998995537176',
    Icon: () => <FontAwesome name="user-circle-o" size={25} color="#ef476f" />,
  },
  {
    title: 'Phone Number',
    subTitle: '+998995537176',
    Icon: () => <Feather name="phone" size={25} color="#ef476f" />,
  },
  {
    title: 'Region',
    subTitle: "Farg'ona",
    Icon: () => <MaterialIcons name="place" size={25} color="#ef476f" />,
  },
  {
    title: 'Email address',
    subTitle: 'sardorbekaminjonov2001@gmail.com',
    Icon: () => <MaterialIcons name="email" size={25} color="#ef476f" />,
  },
];

const ProfileScreen = () => {
  const renderItem = ({
    item,
  }: {
    item: {Icon: any; title: string; subTitle: string};
  }) => (
    <ListItem bottomDivider>
      <item.Icon />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.subTitle}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
  return (
    <View style={styles.main}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item, idx) => idx.toString()}
      />
      <FAB
        style={styles.fab}
        icon="pencil"
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#ef476f',
  },
});

export default ProfileScreen;
