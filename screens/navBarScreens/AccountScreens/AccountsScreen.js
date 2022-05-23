import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {useNavigation} from '@react-navigation/native';
import {baseUrl2} from '../../../http/index';
import {useDispatch} from 'react-redux';

const AccountsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const url = baseUrl2 + '/users/list';
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log('error', error);
    }
  };
  let userProfilePage = i => {
    dispatch({type: 'USSER_ID', payload: i});
    navigation.navigate('AccounProfiletScreen');
  };

  let content = data?.data?.map((elem, index) => {
    let img;
    if (elem.image !== undefined) {
      img = {uri: elem.image};
    } else {
      img = require('../../../assets/defoult.png');
    }
    return (
      <View key={elem.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => userProfilePage(elem.id)}>
          <View style={[styles.userProfile, styles.shadowProp]}>
            <View style={styles.imgFrame}>
              <Image source={img} style={styles.userImage} />
            </View>
            <Text style={styles.userName}>
              {elem.last_name} {elem.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.wrapStyle}>{content}</View>
      </ScrollView>
    </View>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  users: {
    width: '100%',
    marginBottom: 10,
  },
  userProfile: {
    width: '100%',
    height: 75,
    display: 'flex',
    borderRadius: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // borderColor: 'silver',
    // borderWidth: 1,
    backgroundColor: 'white',
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
  shadowProp: {
    elevation: 7,
    shadowColor: '#785425',
    borderRadius: 8,
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    color: '#727272',
    textAlign: 'left',
    fontWeight: '400',
  },
  wrapStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
