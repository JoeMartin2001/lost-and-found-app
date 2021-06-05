import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import {useAppDispatch} from '../hooks/hooks';
import Entypo from 'react-native-vector-icons/Entypo';
import {logoutUser} from '../redux/auth/authSlice';
import {Image, StyleSheet, Text} from 'react-native';
import SearchScreen from '../screens/Search/SearchScreen';
import {AppParamList} from './AppParamList';
import ItemInfo from '../screens/ItemInfo/ItemInfo';
import ChatRoom from '../screens/ChatRoom/ChatRoom';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Settings from '../screens/Settings/Settings';
import TermsAndServices from '../screens/TermsAndServices/TermsAndServices';
import Support from '../screens/Support/Support';
import About from '../screens/About/About';
import {colors} from '../config/colors';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {socketIO} from '../common/socketIO';

const Stack = createStackNavigator<AppParamList>();

const AppStack = () => {
  const dispatch = useAppDispatch();

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#ffffff',
        gestureEnabled: true,
      })}
      headerMode="float"
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerTitle: () => (
            <Image source={require('./img/Choralogo_white.png')} />
          ),
          headerRight: () => (
            <Menu style={{paddingHorizontal: 5}}>
              <MenuTrigger>
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  color="#ffffff"
                  style={{padding: 10}}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => console.log(`Save`)}
                  style={{
                    paddingVertical: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 16}}>Support</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => console.log(`Delete`)}
                  style={{paddingVertical: 10, justifyContent: 'center'}}>
                  <Text style={{color: 'black', fontSize: 16}}>
                    Terms and Services
                  </Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    socketIO.disconnect();
                    dispatch(logoutUser());
                  }}
                  style={{
                    paddingVertical: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'black', fontSize: 16}}>Logout</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ),
        })}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ItemInfo" component={ItemInfo} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="TermsAndServices" component={TermsAndServices} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logOutTouchable: {
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
});

export default AppStack;
