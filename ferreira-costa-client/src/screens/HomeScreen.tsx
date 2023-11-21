import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text } from "react-native";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { colors } from "../utils";

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const onPress = () => navigation.replace("AuthNavigator");
  return (
    <Screen style={styles.container}>
      <Text>Home Screen</Text>
      <Button label="Logout" onPress={onPress}>
      </Button>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
