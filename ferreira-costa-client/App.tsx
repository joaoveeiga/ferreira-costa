import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { AppNavigator } from "./src/navigators";
import { screenOptions } from "./src/utils";
import React from "react";
import { APIProvider, HttpQueryProvider } from "./src/providers";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  return (
    <HttpQueryProvider>
      <APIProvider>
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
      </APIProvider>
    </HttpQueryProvider>
  );
}
