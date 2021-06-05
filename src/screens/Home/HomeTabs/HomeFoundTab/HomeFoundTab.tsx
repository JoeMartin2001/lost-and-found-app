import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {baseUrl} from '../../../../config/baseUrl';
import {AppParamList} from '../../../../navigation/AppParamList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ListItem} from 'react-native-elements';
import {FAB} from 'react-native-paper';
import {getParsedDate} from '../../../../functions/timeParsers';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {colors} from '../../../../config/colors';
import {useQuery} from 'react-query';
import CustomLoading from '../../../../components/CustomLoading';

const fetchLostItems = async (page: Number) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/item/getAllItems?page=${page}&limit=10&region=Toshkent&case=Found`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const HomeFoundTab = ({
  navigation,
}: {
  navigation: NavigationProp<AppParamList, 'Home'>;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [page, setPage] = useState(1);

  const {isError, isFetching, data, refetch} = useQuery(
    ['lost-items', page],
    () => fetchLostItems(page),
    {
      keepPreviousData: true,
    },
  );

  const renderItems = ({
    item,
  }: {
    item: {title: string; _id: string; date: Date};
  }) => (
    <TouchableWithoutFeedback>
      <ListItem bottomDivider>
        <FontAwesome name="user-circle" size={22} />
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{getParsedDate(item.date)}</ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          onPress={() => navigation.navigate('ItemInfo', {id: item._id})}>
          <MaterialIcons name="message" size={26} />
        </TouchableOpacity>
      </ListItem>
    </TouchableWithoutFeedback>
  );

  const onRefresh = React.useCallback(async () => {
    setPage(1);
    setRefreshing(true);

    await refetch();
    setRefreshing(false);
  }, []);

  if (isFetching) return <CustomLoading />;
  if (isError) return <Text>Error</Text>;

  return (
    <View style={styles.main}>
      <View style={styles.listView}>
        <FlatList
          data={data.results}
          renderItem={renderItems}
          keyExtractor={(item, idx) => idx.toString()}
          initialNumToRender={7}
          ListFooterComponent={() => (
            <View style={styles.loadMoreView}>
              <TouchableWithoutFeedback
                style={styles.loadMoreTouchable}
                disabled={data.previous === undefined ? true : false}
                onPress={() => {
                  setPage(page - 1);
                }}>
                <Text
                  style={
                    data.previous === undefined
                      ? styles.loadMoreTextDisabled
                      : styles.loadMoreText
                  }>
                  <Entypo name="chevron-thin-left" size={20} />
                </Text>
              </TouchableWithoutFeedback>
              <Text style={{fontSize: 20, borderBottomWidth: 1}}>{page}</Text>
              <TouchableWithoutFeedback
                style={styles.loadMoreTouchable}
                disabled={data.results.length < data.next.limit ? true : false}
                onPress={() => {
                  setPage(page + 1);
                }}>
                <Text
                  style={
                    data.results.length < data.next.limit
                      ? styles.loadMoreTextDisabled
                      : styles.loadMoreText
                  }>
                  <Entypo name="chevron-thin-right" size={20} />
                </Text>
              </TouchableWithoutFeedback>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <FAB
        style={styles.fab}
        icon="filter"
        onPress={() => setFilterModal(true)}
      />
      <Modal visible={filterModal} animationType="fade">
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeTouchable}
            onPress={() => setFilterModal(false)}>
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalView: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  closeTouchable: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
  },
  listView: {
    flex: 1,
  },
  loadMoreView: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '25%',
  },
  loadMoreTouchable: {},
  loadMoreText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryWithOpacity,
    borderRadius: 25,
  },
  loadMoreTextDisabled: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: '#e5e5e5',
    borderRadius: 25,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#ef476f',
  },
});

export default HomeFoundTab;
