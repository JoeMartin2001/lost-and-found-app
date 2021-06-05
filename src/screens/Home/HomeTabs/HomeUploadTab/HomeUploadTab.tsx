import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {regions} from '../../../../common/regions';
import DatePickerComponent from '../../../../components/DatePickerComponent';
import {colors} from '../../../../config/colors';
import {useMutation} from 'react-query';
import {baseUrl} from '../../../../config/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage, hideMessage} from 'react-native-flash-message';

const HomeUploadTab = () => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCase, setSelectedCase] = useState('Lost');
  const [selectedRegion, setSelectedRegion] = useState('Toshkent');

  const {mutate, isLoading} = useMutation(async () =>
    fetch(`${baseUrl}/api/item/createItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        phone,
        case: selectedCase,
        region: selectedRegion,
        date: selectedDate,
        user: await AsyncStorage.getItem('userId'),
      }),
    })
      .then(res => res.json())
      .then(() => {
        setTitle('');
        setDescription('');
        setPhone('');
        showMessage({
          message: 'Your item has successfully been uploaded!',
          type: 'success',
        });
      })
      .catch(err => console.log(err)),
  );

  const isSubmitBtnDisabled = () =>
    title && description && phone ? false : true;

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Upload An Item</Text>
        </View>
        <View style={styles.bodyView}>
          <View style={styles.inputView}>
            <TextInput
              selectionColor="#000000"
              label="Title"
              mode="outlined"
              theme={{colors: {primary: 'red'}}}
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              selectionColor="#000000"
              label="Description"
              mode="outlined"
              theme={{colors: {primary: 'red'}}}
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              keyboardType="phone-pad"
              selectionColor="#000000"
              label="Phone"
              mode="outlined"
              theme={{colors: {primary: 'red'}}}
              value={phone}
              onChangeText={text => setPhone(text)}
            />
          </View>
          <View style={styles.pickerView}>
            <Picker
              prompt="Case"
              selectedValue={selectedCase}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCase(itemValue)
              }>
              <Picker.Item label="Lost" value="Lost" />
              <Picker.Item label="Found" value="Found" />
            </Picker>
          </View>
          <View style={styles.pickerView}>
            <Picker
              prompt="Region"
              selectedValue={selectedRegion}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedRegion(itemValue)
              }>
              {regions.map((region: string, idx: number) => (
                <Picker.Item label={region} value={region} key={idx} />
              ))}
            </Picker>
          </View>
          <DatePickerComponent date={selectedDate} setDate={setSelectedDate} />
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity
            disabled={isSubmitBtnDisabled()}
            onPress={() => mutate()}
            style={
              isSubmitBtnDisabled()
                ? styles.bottomTouchableDisabled
                : styles.bottomTouchable
            }>
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.bottomTouchableText}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyView: {
    paddingHorizontal: 10,
  },
  pickerView: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 10,
  },
  inputView: {
    marginBottom: 5,
  },
  bottomView: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomTouchable: {
    width: 250,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTouchableDisabled: {
    width: 250,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTouchableText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default HomeUploadTab;
