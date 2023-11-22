import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Center, Heading, ScrollView, VStack } from "native-base";
import { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Screen, Select, SelectItem, Text } from "../components";
import { UserStatus } from "../types";
import {
  applyCpfMask,
  applyPhoneMask,
  formatDate,
  removeMask,
  validateChecksumDigits,
} from "../utils";
import { AppBar } from "../components/AppBar";

type SignUpFormDataProps = {
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
  phoneNumber: yup
    .string()
    .required("Informe o seu celular")
    .matches(/^\d{11}$/, "O número do seu celular deve possuir 11 números"),
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
  const { control, handleSubmit, formState, setValue } =
    useForm<SignUpFormDataProps>({
      resolver: yupResolver(signUpSchema) as Resolver<SignUpFormDataProps, any>,
    });
  const { errors } = formState;
  function submit(data: SignUpFormDataProps) {
    console.log(data);
  }
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [birthday, setBirthday] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [cpf, setCpf] = useState<string>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const handlePhoneOnChange = (value: string) => {
    setPhoneNumber(applyPhoneMask(value));
    setValue("phoneNumber", removeMask(value));
  };

  const handleCpfOnChange = (value: string) => {
    setCpf(applyCpfMask(value));
    setValue("cpf", removeMask(value));
  };

  const onChangeSelectedDate = ({ type }, date: Date) => {
    if (type == "set") {
      const formattedDate = formatDate(date);
      setSelectedDate(date);
      setBirthday(formattedDate);
      setValue("birthday", formattedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <Screen>
      <AppBar label="Crie sua conta" />
      <VStack px={8} mb={6} flex={1} justifyContent="space-around">
        <ScrollView py={6} showsVerticalScrollIndicator={false}>
          <Text mb={2} bold >Nome</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.name?.message}
                placeholder="João da Silva"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold >Login</Text>
          <Controller
            control={control}
            name="login"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.login?.message}
                placeholder="Crie o seu login"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold >Senha</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.password?.message}
                placeholder="Insira sua senha"
                onChangeText={onChange}
                password
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold >Confirme a sua senha</Text>
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.passwordConfirmation?.message}
                password
                placeholder="Confirme a sua senha"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold >Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                errorMessage={errors.email?.message}
                placeholder="exemplo@email.com"
                onChangeText={onChange}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold >Celular</Text>
          <Controller
            control={control}
            name="phoneNumber"
            render={() => (
              <Input
                value={phoneNumber}
                errorMessage={errors.phoneNumber?.message}
                placeholder="(XX) XXXXX-XXXX"
                onChangeText={(value) => handlePhoneOnChange(value)}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold >CPF</Text>
          <Controller
            control={control}
            name="cpf"
            render={() => (
              <Input
                value={cpf}
                errorMessage={errors.cpf?.message}
                placeholder="XXX.XXX.XXX-XX"
                onChangeText={(value) => handleCpfOnChange(value)}
              ></Input>
            )}
          ></Controller>
          <Text mb={2} bold >Data de nascimento</Text>
          <Controller
            control={control}
            name="birthday"
            render={({ field: { onChange } }) => (
              <>
                {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={selectedDate}
                    onChange={onChangeSelectedDate}
                    minimumDate={new Date()}
                  ></DateTimePicker>
                )}
                {!showDatePicker && (
                  <Input
                    value={birthday}
                    errorMessage={errors.birthday?.message}
                    placeholder="DD/MM/AAAA"
                    onChangeText={onChange}
                    editable={false}
                    onPressIn={toggleDatePicker}
                  ></Input>
                )}
              </>
            )}
          ></Controller>
          <Text mb={2} bold >Nome da mãe</Text>
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
          <Text mb={2} bold >Status</Text>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange } }) => (
              <Select
                onValueChange={onChange}
                placeholder="Ativo"
              >
                <SelectItem label="Ativo(a)" value={UserStatus.ACTIVE} />
                <SelectItem label="Inativo(a)" value={UserStatus.INACTIVE} />
                <SelectItem label="Bloqueado(a)" value={UserStatus.BLOCKED} />
              </Select>
            )}
          ></Controller>
        </ScrollView>
        <Button
          label="Cadastrar usuário"
          onPress={handleSubmit(submit)}
        ></Button>
      </VStack>
    </Screen>
  );
};
