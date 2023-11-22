import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon, VStack } from "native-base";
import { Controller, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Screen, Text } from "../components";
import { AppBar } from "../components/AppBar";

type ChangePasswordFormProps = {
  password: string;
  passwordConfirmation: string;
};

const changePasswordSchema = yup.object({
  password: yup
    .string()
    .required("Informe a sua senha")
    .min(6, "A sua senha deve conter pelo menos 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("password")], "Suas senhas precisam ser iguais"),
});

export const ChangePasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const onPress = () => navigation.replace("LoginScreen");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormProps>({
    resolver: yupResolver(changePasswordSchema) as Resolver<
      ChangePasswordFormProps,
      any
    >,
  });
  return (
    <Screen>
      <AppBar label="Redefina a senha" />
      <VStack justifyContent={"space-between"} flex={1} py={4} px={8}>
        <VStack>
          <Text mb={1} bold fontSize={"lg"}>
            Redefina a sua senha
          </Text>
          <Text mb={1} fontSize={"sm"}>
            Agora vamos <Text bold>redefinir</Text> sua senha.
          </Text>
          <Text mb={8} fontSize={"sm"}>
            Digite sua <Text bold>nova senha</Text> e <Text bold>confirme</Text>
            .
          </Text>
          <Text mb={2} bold>
            Senha
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                password
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml="2"
                    color="coolGray.400"
                  />
                }
                errorMessage={errors.password?.message}
                placeholder="Insira sua nova senha"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold>
            Confirme sua senha
          </Text>
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange } }) => (
              <Input
                password
                errorMessage={errors.passwordConfirmation?.message}
                placeholder="Digite a senha novamente"
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
        </VStack>
        <VStack>
          <Button label="Redefina sua senha" onPress={onPress}></Button>
        </VStack>
      </VStack>
    </Screen>
  );
};
