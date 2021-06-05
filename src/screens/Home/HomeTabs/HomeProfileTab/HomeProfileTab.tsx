import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Divider} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationProp, Route} from '@react-navigation/core';
import {AppParamList} from '../../../../navigation/AppParamList';

const menuItems = [
  {
    title: 'Account',
    subTitle: 'Email, phone, etc',
    Icon: () => <MaterialIcons name="email" size={24} color="#ef476f" />,
    to: 'Profile',
  },
  {
    title: 'Settings',
    subTitle: 'Theme, preferences, etc',
    Icon: () => <MaterialIcons name="settings" size={24} color="#ef476f" />,
    to: 'Settings',
  },
  {
    title: 'Terms & Services',
    subTitle: 'Theme, preferences, etc',
    Icon: () => <MaterialIcons name="help-outline" size={24} color="#ef476f" />,
    to: 'TermsAndServices',
  },
  {
    title: 'Support',
    subTitle: 'Theme, preferences, etc',
    Icon: () => <AntDesign name="customerservice" size={24} color="#ef476f" />,
    to: 'Support',
  },
  {
    title: 'About',
    subTitle: 'Developers, contact, etc',
    Icon: () => <Feather name="info" size={24} color="#ef476f" />,
    to: 'About',
  },
];

const HomeProfileTab = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AppParamList, 'Profile'>;
  route: Route<'Profile'>;
}) => {
  const renderItems = ({
    item,
  }: {
    item: {Icon: any; title: string; subTitle: string; to: string};
  }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.to as keyof AppParamList)}>
      <ListItem bottomDivider>
        <item.Icon />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.subTitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <Divider />
      <FlatList
        data={menuItems}
        renderItem={renderItems}
        keyExtractor={(item, idx) => idx.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  avatar_view: {
    paddingHorizontal: 15,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar_view_right: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#ef476f',
  },
});

export default HomeProfileTab;
