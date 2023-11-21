import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens";
import { screenOptions } from "../utils";

const { Navigator, Screen } = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <Navigator screenOptions={screenOptions}>
      <Screen name="HomeScreen" component={HomeScreen} />
    </Navigator>
  );
};
