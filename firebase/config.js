import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQPgtRj6syp5ia3EHFguD5zjIiMxf26lg",
  authDomain: "react-native-hw-22d6f.firebaseapp.com",
  projectId: "react-native-hw-22d6f",
  storageBucket: "react-native-hw-22d6f.appspot.com",
  messagingSenderId: "229229115578",
  appId: "1:229229115578:web:320b22dc1457c6253a2a83",
  measurementId: "G-30CNW7VS17",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
