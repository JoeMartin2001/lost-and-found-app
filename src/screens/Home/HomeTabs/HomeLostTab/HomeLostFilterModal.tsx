import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {regions} from '../../../../common/regions';
import {colors} from '../../../../config/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeCase,
  changeRegion,
  selectSearchFilterState,
} from '../../../../redux/searchFilter/searchFilterSlice';

const HomeLostFilterModal = ({
  setPage,
  filterModal,
  setFilterModal,
}: {
  setPage: Dispatch<any>;
  filterModal: boolean;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchFilter = useSelector(selectSearchFilterState);
  const [selectedCase, setSelectedCase] = useState(searchFilter.case);
  const [selectedRegion, setSelectedRegion] = useState(searchFilter.region);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setPage(1);
    dispatch(changeCase(selectedCase));
    dispatch(changeRegion(selectedRegion));
    setFilterModal(false);
  };

  return (
    <Modal
      visible={filterModal}
      animationType="fade"
      transparent
      onRequestClose={() => setFilterModal(false)}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => setFilterModal(false)}>
        <View style={styles.overlayView}>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={() => null}>
            <View style={styles.modalView}>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>Search filters</Text>
              </View>
              <View style={styles.bodyView}>
                <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                  Region
                </Text>
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
                <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
                  Case
                </Text>
                <View style={styles.pickerView}>
                  <Picker
                    prompt="Case"
                    mode="dropdown"
                    selectedValue={selectedCase}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedCase(itemValue)
                    }>
                    <Picker.Item label="Lost" value="Lost" />
                    <Picker.Item label="Found" value="Found" />
                  </Picker>
                </View>
              </View>
              <View style={styles.bottomView}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.bottomTouchable}>
                  <Text style={styles.bottomTouchableText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayView: {
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    height: 360,
    width: '80%',
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  bodyView: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pickerView: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  bottomView: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  bottomTouchable: {
    width: '90%',
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTouchableText: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default HomeLostFilterModal;
