import DateTimePicker from '@react-native-community/datetimepicker';

import React, {Dispatch, SetStateAction, useState} from 'react';
import {View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import {getParsedDate} from '../functions/timeParsers';

const DatePickerComponent = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  // const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => setShow(true);

  return (
    <View>
      <View style={styles.dateInputView}>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.dateInputTouchable}>
          <Text style={{fontSize: 16}}>{getParsedDate(date)}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="spinner"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateInputView: {
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    borderColor: 'grey',
  },
  dateInputTouchable: {
    paddingVertical: 18,
    paddingHorizontal: 10,
  },
});

export default DatePickerComponent;
