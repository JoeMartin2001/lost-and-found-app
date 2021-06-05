import {NavigationProp} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import {baseUrl} from '../../../../config/baseUrl';
import {AppParamList} from '../../../../navigation/AppParamList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ListItem} from 'react-native-elements';
import {FAB} from 'react-native-paper';
import {getParsedDate} from '../../../../functions/timeParsers';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {colors} from '../../../../config/colors';
import {useQuery} from 'react-query';
import CustomLoading from '../../../../components/CustomLoading';
import {callNumber} from '../../../../utils/makePhoneCall';
import HomeLostFilterModal from './HomeLostFilterModal';
import CustomError from '../../../../components/CustomError';
import {useAppSelector} from '../../../../hooks/hooks';
import {selectSearchFilterState} from '../../../../redux/searchFilter/searchFilterSlice';

const fetchLostItems = async ({
  page,
  filterCase,
  region,
}: {
  page: Number;
  filterCase: string;
  region: string;
}) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/item/getAllItems?page=${page}&limit=10&region=${region}&case=${filterCase}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const HomeLostTab = ({
  navigation,
}: {
  navigation: NavigationProp<AppParamList, 'Home'>;
}) => {
  const searchFilter = useAppSelector(selectSearchFilterState);
  const [refreshing, setRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [page, setPage] = useState<any>(1);

  const {isError, isFetching, data, refetch} = useQuery(
    ['found-items', page, searchFilter.case, searchFilter.region],
    () =>
      fetchLostItems({
        page: page,
        filterCase: searchFilter.case,
        region: searchFilter.region,
      }),
    {
      keepPreviousData: true,
    },
  );

  const renderItems = ({
    item,
  }: {
    item: {title: string; _id: string; date: Date; phone: string};
  }) => (
    <TouchableWithoutFeedback>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{getParsedDate(item.date)}</ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          onPress={() => callNumber(item.phone)}
          style={{marginRight: 10}}>
          <FontAwesome name="phone" size={22} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatRoom', {id: item._id})}>
          <MaterialIcons name="message" size={26} color="orange" />
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

  const renderListFooter = () => (
    <View style={styles.loadMoreView}>
      <TouchableWithoutFeedback
        style={styles.loadMoreTouchable}
        disabled={!data.previous}
        onPress={() => {
          setPage(() => setPage((old: number) => Math.max(old - 1, 1)));
        }}>
        <Text
          style={
            !data.previous ? styles.loadMoreTextDisabled : styles.loadMoreText
          }>
          <Entypo name="chevron-thin-left" size={20} />
        </Text>
      </TouchableWithoutFeedback>
      <Text style={{fontSize: 20, borderBottomWidth: 1}}>{page}</Text>
      <TouchableWithoutFeedback
        style={styles.loadMoreTouchable}
        disabled={!data.next}
        onPress={() => {
          setPage(page + 1);
        }}>
        <Text
          style={
            !data.next ? styles.loadMoreTextDisabled : styles.loadMoreText
          }>
          <Entypo name="chevron-thin-right" size={20} />
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );

  if (isFetching) return <CustomLoading />;
  if (isError) return <CustomError refresh={onRefresh} />;

  return (
    <View style={styles.main}>
      <View style={styles.listView}>
        {data.results.length ? (
          <FlatList
            data={data.results}
            renderItem={renderItems}
            keyExtractor={(item, idx) => idx.toString()}
            ListFooterComponent={
              data.next || data.previous ? () => renderListFooter() : null
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: 80, height: 80}}>
              <Image
                source={require('./img/empty-tray.png')}
                style={{width: undefined, height: undefined, flexGrow: 1}}
              />
            </View>
            <Text style={{fontSize: 20}}>Empty region!</Text>
          </View>
        )}
      </View>
      <FAB
        style={styles.fab}
        icon="filter"
        onPress={() => setFilterModal(true)}
      />
      <HomeLostFilterModal
        setPage={setPage}
        filterModal={filterModal}
        setFilterModal={setFilterModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primaryWithOpacity,
    borderRadius: 25,
  },
  loadMoreTextDisabled: {
    paddingHorizontal: 15,
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

export default HomeLostTab;
