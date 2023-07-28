import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function ProfileInfo({}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Image
          source={require('../../../assets/fakeImages/png1.png')}
          style={{width: 78, height: 78, borderRadius: 45}}
        />
        <View style={{width: '70%', marginHorizontal: 15}}>
          <View style={styles.titleContent}>
            <Text style={styles.title}>Ani Manukyan</Text>
          </View>
          <View style={styles.titleContent}>
            <Text style={styles.email}>infosportmasters@gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={[styles.component, {justifyContent: 'space-between', paddingTop: 20}]}>
        <Text style={styles.info}>Followers (1456) </Text>
        <Text style={styles.info}>Followings (1490) </Text>
        <Text style={styles.info}>My Posts(5)</Text>
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