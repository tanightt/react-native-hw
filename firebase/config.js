import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2OE_PAQYNK7JuNg2YJLCR6XOTE7d6YV0",
  authDomain: "react-native-608a4.firebaseapp.com",
  projectId: "react-native-608a4",
  storageBucket: "react-native-608a4.appspot.com",
  messagingSenderId: "63712382734",
  appId: "1:63712382734:web:bb37164f7cc4125b32515f",
  measurementId: "G-3MT9016TZT",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
