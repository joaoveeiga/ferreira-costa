import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HStack, Icon, VStack } from "native-base";
import { Controller, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Screen, Text } from "../components";
import { AppBar } from "../components/AppBar";
import usePostRequest from "../hooks/usePostRequest";
import { Modal } from "../components/Modal";
import { useState } from "react";

type ForgotPasswordFormProps = {
  email: string;
  cpf: string;
};

const forgotPasswordSchema = yup.object({
  email: yup.string().required("O email é obrigatório"),
  cpf: yup.string().required("O cpf é obrigatório"),
});

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  function submit(data: ForgotPasswordFormProps) {
    mutate(data);
  }
  const [showErrorModal, setShowErrorModal] = useState(false);

  const toggleErrorModal = () => setShowErrorModal((prevState) => !prevState);

  const { mutate } = usePostRequest("/users/verify-email-cpf", {
    onSuccess: ({data}) => {
      navigation.replace("ChangePasswordScreen", {
        id: data
      })
    },
    onError: () => {
      toggleErrorModal();
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormProps>({
    resolver: yupResolver(forgotPasswordSchema) as Resolver<
      ForgotPasswordFormProps,
      any
    >,
  });
  return (
    <Screen>
      <AppBar label="Esqueceu a senha" />
      <VStack justifyContent={"space-between"} flex={1} py={4} px={8}>
        <VStack>
          <Text mb={1} bold fontSize={"lg"}>
            Esqueceu sua senha?
          </Text>
          <Text mb={1} fontSize={"sm"}>
            Não se preocupe. Aqui você consegue recuperá-la.
          </Text>
          <Text mb={8} fontSize={"sm"}>
            Digite seu <Text bold>CPF</Text> e <Text bold>email</Text>.
          </Text>
          <Text mb={2} bold>
            Email
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialCommunityIcons name="email-outline" />}
                    size={5}
                    ml="2"
                    color="coolGray.400"
                  />
                }
                errorMessage={errors.email?.message}
                placeholder="exemplo@email.com"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold>
            CPF
          </Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.cpf?.message}
                placeholder="XXX.XXX.XXX-XX"
                onChangeText={onChange}
                InputLeftElement={
                  <Icon
                    as={<AntDesign name="idcard" />}
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
          <Button label="Avançar" onPress={handleSubmit(submit)}></Button>
        </VStack>
      </VStack>
      <Modal
        dismiss={toggleErrorModal}
        title="Atenção!"
        isOpen={showErrorModal}
      >
        <VStack>
          <Text fontSize={"md"}>
            Email e CPF não estão associados.
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
