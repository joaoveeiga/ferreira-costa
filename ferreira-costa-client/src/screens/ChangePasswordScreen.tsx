import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HStack, Icon, VStack } from "native-base";
import { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Screen, Text } from "../components";
import { AppBar } from "../components/AppBar";
import { Modal } from "../components/Modal";
import usePutRequest from "../hooks/usePutRequest";

type ChangePasswordFormProps = {
  password: string;
  passwordConfirmation: string;
};

interface Params {
  id: number;
}

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
  const route = useRoute();
  const params = route?.params as Params;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const toggleSuccessModal = () =>
    setShowSuccessModal((prevState) => !prevState);
  const toggleErrorModal = () => setShowErrorModal((prevState) => !prevState);

  const onPressSuccess = () => {
    toggleSuccessModal();
    return navigation.replace("AuthNavigator");
  };

  const { mutate } = usePutRequest("/users/update-password", {
    onSuccess: () => {
      toggleSuccessModal();
    },
    onError: () => {
      toggleErrorModal();
    },
  });

  function submit(data: ChangePasswordFormProps) {
    mutate({ password: data.password, id: params.id });
  }

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
          <Button
            label="Redefina sua senha"
            onPress={handleSubmit(submit)}
          ></Button>
        </VStack>
      </VStack>

      <Modal
        dismiss={toggleSuccessModal}
        title="Ótimo"
        isOpen={showSuccessModal}
      >
        <VStack>
          <Text fontSize={"md"}>
            Sua senha foi alterada com <Text bold>sucesso</Text>!
          </Text>
          <HStack justifyContent={"space-between"} mt={8}>
            <Button
              w={"full"}
              label="Ok"
              borderRadius={8}
              onPress={onPressSuccess}
            />
          </HStack>
        </VStack>
      </Modal>

      <Modal
        dismiss={toggleErrorModal}
        title="Atenção!"
        isOpen={showErrorModal}
      >
        <VStack>
          <Text fontSize={"md"}>
            Sua senha <Text bold>não</Text> foi alterada!
          </Text>
          <HStack justifyContent={"space-between"} mt={8}>
            <Button
              w={"full"}
              label="Ok"
              borderRadius={8}
              onPress={toggleErrorModal}
            />
          </HStack>
        </VStack>
      </Modal>
    </Screen>
  );
};
