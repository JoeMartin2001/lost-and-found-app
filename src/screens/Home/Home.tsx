import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeChatTab from './HomeTabs/HomeChatTab/HomeChatTab';
import HomeLostTab from './HomeTabs/HomeLostTab/HomeLostTab';
import HomeFoundTab from './HomeTabs/HomeFoundTab/HomeFoundTab';
import HomeProfileTab from './HomeTabs/HomeProfileTab/HomeProfileTab';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeTabParamList} from './HomeTabParamList';
import {colors} from '../../config/colors';
import HomeUploadTab from './HomeTabs/HomeUploadTab/HomeUploadTab';

const Tab = createMaterialBottomTabNavigator<HomeTabParamList>();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeLostTab"
      barStyle={{
        backgroundColor: '#ffffff',
      }}
      activeColor={'#000'}
      // shifting={false}
      backBehavior="initialRoute"
      sceneAnimationEnabled={true}>
      <Tab.Screen
        name="HomeLostTab"
        component={HomeLostTab}
        options={{
          tabBarLabel: 'Lost',
          tabBarIcon: ({color, focused}) => (
            <AntDesign
              name="tag"
              color={focused ? colors.primary : color}
              size={24}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="HomeFoundTab"
        component={HomeFoundTab}
        options={{
          tabBarLabel: 'Found',
          tabBarIcon: ({color, focused}) => (
            <AntDesign
              name="bulb1"
              color={focused ? colors.primary : color}
              size={24}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="HomeUploadTab"
        component={HomeUploadTab}
        options={{
          tabBarLabel: 'Upload',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="inbox-arrow-up"
              color={focused ? colors.primary : color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HomeChat"
        component={HomeChatTab}
        options={{
          tabBarLabel: 'Chat',
          // tabBarBadge: 10,
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="chatbox-outline"
              color={focused ? colors.primary : color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HomeProfileTab"
        component={HomeProfileTab}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, focused}) => (
            <FontAwesome
              name="user-circle-o"
              color={focused ? colors.primary : color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
