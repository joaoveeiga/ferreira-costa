import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  AddNewUserScreen,
  ChangePasswordScreen,
  ForgotPasswordScreen,
  LoginScreen,
} from "../screens";
import { screenOptions } from "../utils";

const { Navigator, Screen } = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Screen name="AddNewUserScreen" component={AddNewUserScreen} />
      <Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
    </Navigator>
  );
};
