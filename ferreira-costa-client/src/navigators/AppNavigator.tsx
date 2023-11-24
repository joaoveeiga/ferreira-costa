import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { ListUsersProvider, LoggedUserProvider } from "../providers";
import { screenOptions } from "../utils";
import { AuthNavigator } from "./AuthNavigator";
import { HomeNavigator } from "./HomeNavigator";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NativeBaseProvider>
      <LoggedUserProvider>
        <ListUsersProvider>
          <Navigator screenOptions={screenOptions}>
            <Screen name="AuthNavigator" component={AuthNavigator} />
            <Screen name="HomeNavigator" component={HomeNavigator} />
          </Navigator>
        </ListUsersProvider>
      </LoggedUserProvider>
    </NativeBaseProvider>
  );
};
