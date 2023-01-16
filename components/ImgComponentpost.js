import React, {useState, memo} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ImageModal from 'react-native-image-modal';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import ShareButton from './ShareButton';
import {removeMyPosts} from '../stores/profileMe/profileMeActions';
import RadiusButton from './RadiusButton';

const ImgComponentpost = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [longDis, setLongDis] = useState(false);
  let user = props.uri?.user;
  let post = props?.uri;
  let postCounts = post.comments?.length;
  let isLongDs = () => {
    setLongDis(!longDis);
  };
  console.log(props.type, 'dd')

  let imgBG = (
    <ImageModal
      resizeMode="contain"
      imageBackgroundColor="#000000"
      style={styles.usersProfileBGimage}
      modalImageStyle={{
        borderTopRightRadius: 10,
      }}
      source={{uri: props?.uri.image_path || props?.uri.image}}
    />
  );
  let userTitle;
  if (longDis === false) {
    userTitle = (
      <Text style={styles.usersTitle} numberOfLines={2}>
        {post?.title === 'undefined' ? null : post?.title}
      </Text>
    );
  } else {
    userTitle = (
      <Text style={styles.longDis}>
        <Text> {post?.title === 'undefined' ? null : post?.title} </Text>;
      </Text>
    );
  }

  let likeCounts = post?.likes?.length + 1;
  const time = moment().startOf(user?.created_at).format('LL');
  const userProfilePage = () => {
    navigation.navigate('AccounProfiletScreen', {
      id: user?.id,
    });
  };
  let img;
  if (!user?.image) {
    img = props.user.image;
  } else {
    img = user?.image;
  }
  const deletePost = () => {
    dispatch(removeMyPosts(post?.id));
    alert('Your post delete');
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TouchableOpacity onPress={userProfilePage}>
          <Image source={{uri: img}} style={styles.userspic} />
        </TouchableOpacity>
        <View style={styles.inf}>
          {props.post === 'post' ? (
            <TouchableOpacity style={styles.delete} onPress={deletePost}>
              <Icon name="delete-circle-outline" color="red" size={32} />
            </TouchableOpacity>
          ) : null}
          <View style={styles.usersnames}>
            <View style={{display: 'flex', flexDirection: 'column'}}>
              <Text style={styles.usersname}>
                {user?.name || props?.user.name}{' '}
              </Text>
              <Text style={styles.usersname}>
                {user?.lastname || props?.user.lastname}{' '}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                width: '70%',
              }}>
              <Text style={styles.timeData}>{time} </Text>
              <View>
                {props?.isMyne === true ? null : (
                  <RadiusButton id={post.id} types="post" />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={{zIndex: -1}} onPress={isLongDs}>
        {userTitle}
      </TouchableOpacity>

      <View style={{borderRadius: 8, zIndex: -1}}>{imgBG}</View>
      {props.post === 'post' ? null : (
        <View style={styles.postIcons}>
          <LikeButton
            likeCounts={likeCounts}
            id={post.id}
            authLiked={post.authLiked}
          />
          <TouchableOpacity
            style={styles.imgCount}
            onPress={() =>
              navigation.navigate('CommentScreen', {
                description: post?.title,
                post: post.comments,
                user: user,
                image: user.image,
                id: post.id,
                img: props?.uri.image_path || props?.uri.image,
              })
            }>
            <Icon name={'comment-outline'} size={24} color={'#8A8A8A'} />
            <Text style={styles.counts}>{postCounts} </Text>
          </TouchableOpacity>
          <View style={styles.shareButton}>
            <ShareButton size={24} />
          </View>
        </View>
      )}
    </View>
  );
};
export default memo(ImgComponentpost);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userspic: {
    height: 52,
    width: 52,
    borderRadius: 50,
  },
  inf: {
    width: '80%',
    paddingLeft: 15,
  },
  usersname: {
    color: '#666666',
    fontSize: 16,
  },
  usersnames: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
  },
  postIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10,
    width: '100%',
  },
  usersTitle: {
    maxWidth: '100%',
    paddingBottom: 15,
    paddingTop: 10,
    color: '#727272',
    zIndex: 0,
  },
  timeData: {
    maxWidth: '40%',
    fontSize: 12,
    color: '#727272',
    marginRight: 10,
  },
  longDis: {
    maxWidth: '100%',
    paddingBottom: 15,
    paddingTop: 10,
    color: '#727272',
    zIndex: -1
  },
  usersProfileBGimage: {
    width: 320,
    height: 170,
    borderTopRightRadius: 10,
  },
  shareButton: {
    marginBottom: 20,
  },
  imgCount: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    marginLeft: 'auto',
  },
  counts: {
    color: '#727272',
  },
});
