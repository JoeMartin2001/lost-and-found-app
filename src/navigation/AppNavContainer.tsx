import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {loginUser, selectAuthState} from '../redux/auth/authSlice';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {socketIO} from '../common/socketIO';

const AppNavContainer = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);

  useEffect(() => {
    setLoading(true);

    AsyncStorage.getItem('authToken')
      .then(token => {
        setLoading(false);
        if (token) {
          // socketIO.connect();
          dispatch(loginUser(token));
        }
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {auth.authToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
