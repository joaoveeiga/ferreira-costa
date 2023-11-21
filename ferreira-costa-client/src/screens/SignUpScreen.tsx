import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Center,
  FlatList,
  HStack,
  Heading,
  ScrollView,
  VStack,
} from "native-base";
import { Button } from "../components/Button";
import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCallback } from "react";
import { Text } from "../components/Text";
import { validateChecksumDigits } from "../utils";
import { UserStatus } from "../types";
import React from "react";

type SignUpForm = {
  name: string;
  placeholder: string;
  errorMessage: string;
};
type FormDataProps = {
  name: string;
  login: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  birthday: string;
  motherName: string;
  status: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o seu nome"),
  login: yup.string().required("Informe seu login"),
  password: yup
    .string()
    .required("Informe a sua senha")
    .min(6, "A sua senha deve conter pelo menos 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("password")], "Suas senhas precisam ser iguais"),
  email: yup.string().required("Informe o seu email").email("E-mail inválido"),
  phoneNumber: yup.string().required("Informe o seu celular").length(11, 'O celular deve possuir 11 números'),
  cpf: yup
    .string()
    .required("Informe o seu CPF")
    .matches(/^\d{11}$/, "O CPF deve possuir 11 números")
    .test("cpf-valid", "CPF inválido", (cpf) => validateChecksumDigits(cpf)),
  birthday: yup.string().required("Informe sua data de nascimento"),
  motherName: yup.string().required("Informe o nome da sua mãe"),
  status: yup
    .string()
    .required("Informe o status")
    .oneOf(Object.values(UserStatus), "Status inválido"),
});

export const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema) as Resolver<FormDataProps, any>,
  });
  function submit(data: FormDataProps) {
    console.log(data);
  }

  // const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  // const onPress = () => navigation.replace("HomeNavigator");
  return (
    <Screen>
      <VStack mt={6} mb={6} flex={1} justifyContent="space-around">
        <Center>
          <Heading fontSize={"md"} color={"darkBlue.600"}>
            Crie sua conta
          </Heading>
        </Center>
        <ScrollView>
          <Text mb={2}>Nome</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.name?.message}
                placeholder="Digite o seu nome"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2}>Login</Text>
          <Controller
            control={control}
            name="login"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.login?.message}
                placeholder="Digite o seu login"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2}>Senha</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.password?.message}
                placeholder="Digite sua senha"
                onChangeText={onChange}
                secureTextEntry
              ></Input>
            )}
          ></Controller>
          <Text mb={2}>Confirme a sua senha</Text>
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.passwordConfirmation?.message}
                secureTextEntry
                placeholder="Confirme a sua senha"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.email?.message}
                placeholder="Digite o seu email"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <HStack mb={2}>
            <Text>Celular</Text>
            <Text ml={1} color={"blueGray.400"}>
              (apenas números com DDD)
            </Text>
          </HStack>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.phoneNumber?.message}
                placeholder="Digite o seu número do celular"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <HStack mb={2}>
            <Text>CPF</Text>
            <Text ml={1} color={"blueGray.400"}>
              (apenas números)
            </Text>
          </HStack>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.cpf?.message}
                placeholder="Digite o seu CPF"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2}>Data de nascimento</Text>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.birthday?.message}
                placeholder="Digite a sua data de nascimento"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2}>Nome da mãe</Text>
          <Controller
            control={control}
            name="motherName"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.motherName?.message}
                placeholder="Digite o nome da sua mãe"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2}>Status</Text>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.status?.message}
                placeholder="Digite o status do cadastro"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
        </ScrollView>
        <Button label="Login" onPress={handleSubmit(submit)}></Button>
      </VStack>
    </Screen>
  );
};
