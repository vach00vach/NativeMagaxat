import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';

function ShareIt({}) {
  const [longDes, setLongDes] = useState(false);

  const isLongDs = () => {
    setLongDes(!longDes);
  };
  let description;
  if (longDes === false) {
    description = (
      <Text style={[styles.usersTitle, {marginBottom: 5}]} numberOfLines={5}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </Text>
    );
  } else {
    description = (
      <Text style={[styles.longDis, {marginBottom: 5}]}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </Text>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            fontWeight: 500,
            marginBottom: 10,
          }}>
          Description
        </Text>
        {description}
        <TouchableOpacity onPress={isLongDs}>
          <Text style={{color: 'red', textAlign: 'right'}}>Reade More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.shareContent}>
        <Text
          style={{
            color: '#000',
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 50,
          }}>
          Share It
        </Text>
        <TouchableOpacity
          delayPressIn={0}
          onPress={() =>
            Share.share(
              {
                url: 'https://sponsor.am/en',
              },
              {
                dialogTitle: 'Share your',
                excludedActivityTypes: [
                  'com.apple.UIKit.activity.PostToTwitter',
                ],
              },
            )
          }>
          <Image
            source={require('../../../assets/ShareIt.png')}
            style={{width: 300, height: 150}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ShareIt;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#CFCCCC',
  },
  shareContent: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
    marginTop: 50,
  },
});