import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { selectIsChange } from "../redux/selectors";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { refreshUser } from "../redux/auth/authSlice";

import { RegistrationScreen } from "../Screens/AuthPages/RegistrationScreen";
import { LoginScreen } from "../Screens/AuthPages/LoginScreen";
import { Home } from "../Screens/Home";

const MainStack = createStackNavigator();

export const AppNavigation = () => {
  const stateChanged = useSelector(selectIsChange);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          user: {
            name: user.displayName,
            email: user.email,
            id: user.uid,
            avatar: user.photoURL,
          },
          stateChanged: true,
        };
        dispatch(refreshUser(data));
      } else {
        return;
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {!stateChanged ? (
          <>
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
            <MainStack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <MainStack.Screen name="Home" component={Home} />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
