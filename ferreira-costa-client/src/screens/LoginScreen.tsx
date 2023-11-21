import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Center, Heading, VStack } from "native-base";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import React from "react";

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const onPressLogin = () => navigation.replace("HomeNavigator");
  const onPressSignUp = () => navigation.navigate("SignUpScreen");
  return (
    <Screen>
      <VStack justifyContent={"space-around"} flex={1}>
        <Center>
          <Heading fontSize={"xl"} color={"darkBlue.600"}>Login Screen</Heading>
        </Center>
        <VStack>
          <Button label="Login" onPress={onPressLogin}></Button>
          <Button
            bgColor="transparent"
            label="Cadastre-se"
            labelColor="darkBlue.600"
            pressedBgColor="transparent"
            onPress={onPressSignUp}
          ></Button>
        </VStack>
      </VStack>
    </Screen>
  );
};
