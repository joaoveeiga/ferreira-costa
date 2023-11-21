import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { AppNavigator } from "./src/navigators";
import { screenOptions } from "./src/utils";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="AppNavigator"
            component={AppNavigator}
            options={screenOptions}
          ></Screen>
        </Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
