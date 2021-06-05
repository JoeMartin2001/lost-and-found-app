import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput as PaperTextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {colors} from '../../config/colors';
import {loginUser} from '../../redux/auth/authSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, Route} from '@react-navigation/core';
import {AuthParamList} from '../../navigation/AuthParamList';
import {useMutation} from 'react-query';
import {baseUrl} from '../../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {socketIO} from '../../common/socketIO';

const Login = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<AuthParamList, 'Login'>;
  route: Route<'Login'>;
}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {mutate} = useMutation(async () =>
    fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
      .then(res => res.json())
      .then(async data => {
        if (data.token) {
          socketIO.connect();
          socketIO.on('connect', () => {
            socketIO.emit('new_user', {userId: data.id, socketId: socketIO.id});
          });
          await AsyncStorage.setItem('userId', data.id);
          return dispatch(loginUser(data.token));
        }
        return Alert.alert('Error', 'Invalid form data!');
      })
      .catch(err => console.log(err)),
  );

  const handleSubmit = () => {
    if (username && password.length >= 3) return mutate();
  };

  const isButtonDisabled = () =>
    username && password.length >= 3 ? false : true;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.langBtnView}>
            <TouchableOpacity style={styles.langBtnOpacity}>
              <Text style={styles.langBtnText}>O'zbek</Text>
              <Entypo name="chevron-small-down" size={24} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={styles.bodyView}>
            <View style={styles.headerView}>
              <Text style={styles.headerViewText}>Chora</Text>
              {/* <Image source={require('./img/Choralogo.png')} /> */}
            </View>
            <View style={styles.inputView}>
              <PaperTextInput
                label="Username"
                mode="outlined"
                theme={{
                  colors: {background: '#f5f5f5', primary: colors.primary},
                }}
                value={username}
                onChangeText={text => setUsername(text)}
              />
              <PaperTextInput
                label="Password"
                mode="outlined"
                theme={{
                  colors: {background: '#f5f5f5', primary: colors.primary},
                }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
              />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                disabled={isButtonDisabled()}
                onPress={handleSubmit}
                style={
                  !isButtonDisabled()
                    ? styles.submitBtn
                    : styles.submitBtnDisabled
                }>
                <Text style={styles.submitBtnText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.signUpView}>
            <Text style={styles.signUpQuestionText}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  langBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  langBtnOpacity: {
    height: 40,
    width: 200,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  langBtnText: {
    fontSize: 16,
    color: 'grey',
  },
  bodyView: {},
  headerView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerViewText: {
    fontSize: 60,
    fontFamily: 'magic_owl',
  },
  inputView: {
    marginTop: 40,
    height: 150,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  btnContainer: {
    marginTop: 45,
  },
  submitBtn: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnDisabled: {
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 18,
    color: '#ffffff',
  },
  signUpView: {
    marginTop: 45,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpQuestionText: {
    fontSize: 16,
    marginRight: 10,
  },
  signUpText: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default Login;
