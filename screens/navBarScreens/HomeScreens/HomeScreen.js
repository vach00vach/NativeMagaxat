import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {baseUrl} from '../../../http/index';
// import HeaderFilterSearch from '../../components/HeaderComponent/HeaderFilterSearch';
import {useDispatch} from 'react-redux';
import PostsComponent from '../../../components/PostsComponent';

const HomeScreen = ({navigation}) => {
  const [data, setData] = React.useState('');
  const theme = useTheme();
  const dispatch = useDispatch();

  const fetchData = async () => {
    const resp = await fetch(baseUrl + '/users/list');
    const {data} = await resp.json();
    setData(data);
    // setLoading(false);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  console.log(data.dat, ';');
  const ItemRender = item => (
    <View style={styles.usersProfile}>
      <Image
        source={require('../../../assets/Nikol.png')}
        resizeMode="cover"
        style={styles.usersProfileBGimage}
      />
      <View style={styles.info}>
        <Image
          style={styles.img}
          source={require('../../../assets/Nikol.png')}
        />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </View>
  );

  const Separator = () => {
    return <View style={styles.seperator} />;
  };

  let userProfilePage = item => {
    dispatch({type: 'USSER_ID', payload: item.id});
    navigation.navigate('AccounProfiletScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBackSearch />
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <View style={styles.lastUsersContainerBody}>
          <LinearGradient
            style={styles.lastUsersContainer}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.3, 0.8]}
            colors={['#E0D0BA', '#E4E3E1']}>
            <View style={styles.lastUsersContainercontent}>
              <View style={styles.lastUsersContainerSmall} />
              <Text style={styles.lastUsersContainerText}>
                Last Signed Users
              </Text>
            </View>
          </LinearGradient>
          <SafeAreaView style={styles.flatListContainer}>
            <FlatList
              data={data.data}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => userProfilePage(item)}>
                  <ItemRender name={item.name} userImage={item.userImage} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </SafeAreaView>
        </View>
        <LinearGradient
          style={styles.lastUsersContainer}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.3, 0.8]}
          colors={['#E0D0BA', '#E4E3E1']}>
          <View style={styles.lastUsersContainercontent}>
            <View style={styles.lastUsersContainerSmall} />
            <Text style={styles.lastUsersContainerText}>Popular Posts</Text>
          </View>
        </LinearGradient>
      </ScrollView>
      <PostsComponent />
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  lastUsersContainer: {
    display: 'flex',
    minWidth: '100%',
    height: 57,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
  },
  lastUsersContainerSmall: {
    height: 30,
    width: 8,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#ACA093',
    marginRight: 10,
  },
  lastUsersContainerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#838383',
  },
  lastUsersContainercontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },
  usersProfile: {
    width: 80,
    height: 170,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 8,
    width: 48,
    color: '#464646',
  },
  flatListContainer: {
    paddingVertical: 15,
  },
  img: {
    height: 15,
    width: 15,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  usersProfileBGimage: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  info: {
    height: 30,
    backgroundColor: '#DEDEDE',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  seperator: {
    width: 10,
    height: 50,
  },
});