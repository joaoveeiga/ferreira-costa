import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Center, HStack, Icon, VStack } from "native-base";
import React, { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { Image } from "react-native";
import * as yup from "yup";
import { Button, Input, Screen, Text } from "../components";
import usePostRequest from "../hooks/usePostRequest";
import { Modal } from "../components/Modal";
import { useLoggedUser } from "../hooks/useLoggedUser";

type LoginFormProps = {
  login: string;
  password: string;
};

const loginSchema = yup.object({
  login: yup.string().required("Login é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
});

export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver(loginSchema) as Resolver<LoginFormProps, any>,
  });

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prevState) => !prevState);
  const [_, {setLogged}] = useLoggedUser()

  const { mutate } = usePostRequest("/users/login", {
    onSuccess: () => {
      navigation.replace("HomeNavigator")
      setLogged(true)
    },
    onError: () => {
      toggleModal()
    },
  })

  function submit(data: LoginFormProps) {
    mutate(data);
  }

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const onPressLogin = () => {
    return handleSubmit(submit);
  };
  const onPressSignUp = () => navigation.navigate("AddNewUserScreen", {
    label: 'Crie a sua conta'
  });
  const onPressForgotPassword = () =>
    navigation.navigate("ForgotPasswordScreen");
  return (
    <Screen>
      <VStack px={8} justifyContent={"space-around"} flex={1}>
        <Center>
          <Image
            source={require("../../assets/logo.png")}
            style={{
              width: 175,
              height: 175,
            }}
          />
        </Center>
        <VStack>
          <Text mb={2} bold>
            Login
          </Text>
          <Controller
            control={control}
            name="login"
            render={({ field: { onChange } }) => (
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="coolGray.400"
                  />
                }
                errorMessage={errors.login?.message}
                placeholder="Login"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold>
            Senha
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                password
                errorMessage={errors.password?.message}
                placeholder="Senha"
                onChangeText={onChange}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml="2"
                    color="coolGray.400"
                  />
                }
              ></Input>
            )}
          ></Controller>
          <Button
            bgColor="transparent"
            label="Esqueceu a sua senha?"
            labelColor="darkBlue.800"
            pressedBgColor="transparent"
            onPress={onPressForgotPassword}
          ></Button>
        </VStack>
        <VStack>
          <Button label="Login" onPress={onPressLogin()}></Button>
          <Button
            bgColor="transparent"
            label="Cadastre-se"
            labelColor="darkBlue.800"
            pressedBgColor="transparent"
            onPress={onPressSignUp}
          ></Button>
        </VStack>
      </VStack>
      <Modal dismiss={toggleModal} title="Atenção!" isOpen={showModal}>
        <VStack>
          <Text fontSize={"md"}>
            Login e/ou senha incorreto(s).
          </Text>
          <HStack justifyContent={"space-between"} mt={8}>
            <Button
              w={"full"}
              label="Ok"
              borderRadius={8}
              onPress={toggleModal}
            />
          </HStack>
        </VStack>
      </Modal>
    </Screen>
  );
};
