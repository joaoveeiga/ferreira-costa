import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../utils";
import { AuthNavigator } from "./AuthNavigator";
import { HomeNavigator } from "./HomeNavigator";
import { NativeBaseProvider } from "native-base";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NativeBaseProvider>
      <Navigator screenOptions={screenOptions}>
        <Screen name="AuthNavigator" component={AuthNavigator} />
        <Screen name="HomeNavigator" component={HomeNavigator} />
      </Navigator>
    </NativeBaseProvider>
  );
};
