import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function ProfileInfo({user}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Image
          source={{uri: user.avatar}}
          style={{width: 78, height: 78, borderRadius: 45}}
        />
        <View style={{width: '70%', marginHorizontal: 15}}>
          <View style={styles.titleContent}>
            <Text style={styles.title}>
              {user.name} {user.last_name}
            </Text>
          </View>
          <View style={styles.titleContent}>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.component,
          {justifyContent: 'space-between', paddingTop: 20},
        ]}>
        <Text style={styles.info}>Followers ({user.followers}) </Text>
        <Text style={styles.info}>Followings ({user.followings}) </Text>
        <Text style={styles.info}>My Posts({user.patrons.length})</Text>
      </View>
    </View>
  );
}
export default ProfileInfo;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'space-between',
    // borderWidth: 0.5,
    // borderColor: '#CFCCCC',
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#242424',
    fontSize: 32,
  },
  email: {
    color: '#5F5F5F',
    fontSize: 16,
  },
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  info: {
    color: '#333333',
    fontSize: 14,
  },
});
