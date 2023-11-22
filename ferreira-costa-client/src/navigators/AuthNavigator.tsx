import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../utils";
import { ChangePasswordScreen, ForgotPasswordScreen, LoginScreen, SignUpScreen } from "../screens";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="SignUpScreen" component={SignUpScreen} />
      <Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
    </Navigator>
  );
};
