import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  StyleSheet,
  StatusBar,
  SectionList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import ImageModal from 'react-native-image-modal';
import Icon from 'react-native-vector-icons/Foundation';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {useAccountProfHome} from '../../../components/hooks/useAccountProfHome';
import {loadPostsUser} from '../../../stores/post/postActions';
import HorizontalInfinitiScroll from '../../../components/HorizontalInfinitiScroll';
import ShareButton from '../../../components/ShareButton';

const BenefactorUserPageScreen = props => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isSub, setIssub] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  let id = props.route?.params?.id;
  const {isLoading, posts} = useSelector(state => state.post);
  const {options} = useAccountProfHome({id, isSub});
  let user = options?.data?.appeals[0];
  useEffect(() => {
    dispatch(loadPostsUser({currentPage: currentPage, id: id}));
  }, []);
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadPostsUser({currentPage: currentPage + 1, id: id}));
  };
  const _share = async () => {
    Share.share(
      {
        //message: 'https://sponsor.am',
        url: 'https://sponsor.am',
      },
      {
        // Android only:
        dialogTitle: 'Share your',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };

  let content = (
    <>
      <View style={styles.userInfo}>
        <View style={styles.names}>
          <Image source={{uri: user?.image_path}} style={styles.userImage} />
          <Text style={styles.nameSurname}>
            {moment().startOf(user?.created_at).format('LL')}
          </Text>
          <View style={styles.userInfo2}>
            <Text style={styles.nameSurname}>{user?.description}</Text>
          </View>
        </View>
      </View>

      <View style={styles.textBody}>
        <Text style={styles.text}>{user?.title}</Text>
        <View style={styles.contentVideo}>
          <View style={{borderRadius: 10, width: '48%'}}>
            <VideoPlayer
              video={{uri: user?.video_path}}
              autoplay={false}
              defaultMuted={false}
              style={styles.mediaVideo}
              fullscreen={true}
            />
          </View>
          <View style={{borderRadius: 10, width: '48%'}}>
            <ImageModal
              resizeMode="contain"
              imageBackgroundColor="#000000"
              style={styles.usersProfileBGimage}
              // modalImageStyle={{
              //   borderTopRightRadius: 10,
              // }}
              source={{uri: user?.image_path}}
            />
          </View>
        </View>
        <View style={styles.sharesButtons}>
          <Text
            style={{fontSize: 20, paddingRight: 10, color: 'silver'}}
            onPress={() => _share()}>
            Share
          </Text>
          <ShareButton size={18} />
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      <SectionList
        style={{width: '100%'}}
        contentContainerStyle={{paddingHorizontal: 10}}
        stickySectionHeadersEnabled={false}
        sections={SECTIONS}
        renderSectionHeader={({section}) => content}
        renderItem={() => (
          <HorizontalInfinitiScroll
            isLoading={isLoading}
            posts={posts}
            loadMoreItem={loadMoreItem}
            from="Account"
          />
        )}
      />
    </View>
  );
};
const SECTIONS = [
  {
    title: 'Last Users',
    data: [
      {
        key: '1',
      },
    ],
  },
];
export default BenefactorUserPageScreen;

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
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  userInfo2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
//    paddingLeft: 10,
    maxWidth: '100%',
  },
  userImage: {
    width: '100%',
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
  mediaVideo: {
    // width: '100%',
    height: 89,
  },
  usersProfileBGimage: {
    width: '100%',
    minWidth: 150,
    height: 88,
  },
  nameSurname: {
    color: '#727272',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
  },
  textBody: {
    width: '100%',
    marginVertical: 30,
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
  },
  contentVideo: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  names: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    //alignItems: 'center',
  },
  sharesButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderTopWidth: 1,
    paddingTop: 20,
    borderColor: 'silver',
  },
});
