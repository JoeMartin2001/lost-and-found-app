import {NavigationProp, Route} from '@react-navigation/core';
import React from 'react';
import {View, Text} from 'react-native';
import {AppParamList} from '../../navigation/AppParamList';

const ItemInfo = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AppParamList, 'ItemInfo'>;
  route: Route<'ItemInfo', {id: string}>;
}) => {
  console.log(route.params.id);
  return (
    <View>
      <Text>item info</Text>
    </View>
  );
};

export default ItemInfo;
