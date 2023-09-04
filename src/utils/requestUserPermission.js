import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      } else {
        subscribeToTokenRefresh();
      }
    } catch (error) {
      console.log(error, 'err');
    }
  }
};

const subscribeToTokenRefresh = () => {
  messaging().onTokenRefresh(async newFcmToken => {
    try {
      await AsyncStorage.setItem('fcmToken', newFcmToken);
    } catch (error) {
      console.log(error, 'err');
    }
  });
};

requestUserPermission();