import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBOT2WlQK3MQpZKx0a8tdbQ12VmqxpKYo",
  authDomain: "complexivo-84dac.firebaseapp.com",
  projectId: "complexivo-84dac",
  storageBucket: "complexivo-84dac.appspot.com",
  messagingSenderId: "265983240358",
  appId: "1:265983240358:web:9feb87ee90f5c107e5ec67",
};

const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
