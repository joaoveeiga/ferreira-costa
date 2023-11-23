import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input, Select, SelectItem, Text } from "../components";
import { User, UserStatus } from "../types";
import {
  applyCpfMask,
  applyPhoneMask,
  formatDate,
  removeMask,
  validateChecksumDigits,
} from "../utils";

type UserFormDataProps = {
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

const userSchema = yup.object({
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

type UserFormProps = {
  isEditingUser?: boolean;
  user?: User;
};

export const UserForm = ({ isEditingUser = false, user }: UserFormProps) => {
  const { control, handleSubmit, formState, setValue } =
    useForm<UserFormDataProps>({
      resolver: yupResolver(userSchema) as Resolver<UserFormDataProps, any>,
      defaultValues: {
        name: user?.name,
        birthday: user?.birthday,
        cpf: user?.cpf,
        email: user?.email,
        login: user?.login,
        motherName: user?.motherName,
        password: user?.password,
        passwordConfirmation: user?.passwordConfirmation,
        phoneNumber: user?.phoneNumber,
        status: user?.status,
      },
    });
  const { errors } = formState;

  function submit(data: UserFormDataProps) {
    console.log(data);
  }

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [login, setLogin] = useState(user?.login);
  const [password, setPassword] = useState(user?.password);
  const [passwordConfirmation, setPasswordConfirmation] = useState(
    user?.passwordConfirmation
  );
  const [motherName, setMotherName] = useState(user?.motherName);
  const [status, setStatus] = useState(user?.status);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [birthday, setBirthday] = useState<string>(user?.birthday);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    applyPhoneMask(user?.phoneNumber)
  );
  const [cpf, setCpf] = useState<string>(applyCpfMask(user?.cpf));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const handleOnChangeName = (value: string) => {
    setName(value);
    setValue("name", value);
  };

  const handleOnChangeEmail = (value: string) => {
    setEmail(value);
    setValue("email", value);
  };

  const handleOnChangeLogin = (value: string) => {
    setLogin(value);
    setValue("login", value);
  };

  const handleOnChangePassword = (value: string) => {
    setPassword(value);
    setValue("password", value);
  };

  const handleOnChangePasswordConfirmation = (value: string) => {
    setPasswordConfirmation(value);
    setValue("passwordConfirmation", value);
  };

  const handleOnChangeMotherName = (value: string) => {
    setMotherName(value);
    setValue("motherName", value);
  };

  const handleOnChangeStatus = (value: string) => {
    setStatus(value);
    setValue("status", value);
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
    <VStack mb={4} flex={1} justifyContent="space-around">
      <ScrollView px={8} pt={2} showsVerticalScrollIndicator={false}>
        <Text mb={2} bold>
          Nome
        </Text>
        <Controller
          control={control}
          name="name"
          render={() => (
            <Input
              value={name}
              errorMessage={errors.name?.message}
              placeholder="João da Silva"
              onChangeText={handleOnChangeName}
            ></Input>
          )}
        ></Controller>
        <Text mb={2} bold>
          Login
        </Text>
        <Controller
          control={control}
          name="login"
          render={() => (
            <Input
              value={login}
              errorMessage={errors.login?.message}
              placeholder="Crie o seu login"
              onChangeText={handleOnChangeLogin}
            ></Input>
          )}
        ></Controller>
        <Text mb={2} bold>
          Senha
        </Text>
        <Controller
          control={control}
          name="password"
          render={() => (
            <Input
              errorMessage={errors.password?.message}
              placeholder="Insira sua senha"
              value={password}
              onChangeText={handleOnChangePassword}
              password
            ></Input>
          )}
        ></Controller>
        <Text mb={2} bold>
          Confirme a sua senha
        </Text>
        <Controller
          control={control}
          name="passwordConfirmation"
          render={() => (
            <Input
              errorMessage={errors.passwordConfirmation?.message}
              password
              placeholder="Confirme a sua senha"
              value={passwordConfirmation}
              onChangeText={handleOnChangePasswordConfirmation}
            ></Input>
          )}
        ></Controller>
        <Text mb={2} bold>
          Email
        </Text>
        <Controller
          control={control}
          name="email"
          render={() => (
            <Input
              errorMessage={errors.email?.message}
              value={email}
              placeholder="exemplo@email.com"
              onChangeText={handleOnChangeEmail}
            ></Input>
          )}
        ></Controller>
        <Text mb={2} bold>
          Celular
        </Text>
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
        <Text mb={2} bold>
          CPF
        </Text>
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
        <Text mb={2} bold>
          Data de nascimento
        </Text>
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
                  maximumDate={new Date()}
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
        <Text mb={2} bold>
          Nome da mãe
        </Text>
        <Controller
          control={control}
          name="motherName"
          render={() => (
            <Input
              value={motherName}
              errorMessage={errors.motherName?.message}
              placeholder="Digite o nome da sua mãe"
              onChangeText={handleOnChangeMotherName}
            ></Input>
          )}
        ></Controller>
        <Text mb={2} bold>
          Status
        </Text>
        <Controller
          control={control}
          name="status"
          render={() => (
            <Select
              defaultValue={status}
              onValueChange={handleOnChangeStatus}
              placeholder="Ativo"
            >
              <SelectItem label="Ativo(a)" value={UserStatus.ACTIVE} />
              <SelectItem label="Inativo(a)" value={UserStatus.INACTIVE} />
              <SelectItem label="Bloqueado(a)" value={UserStatus.BLOCKED} />
            </Select>
          )}
        ></Controller>
      </ScrollView>
      <VStack mx={8}>
        <Button
          label={isEditingUser ? "Salvar usuário" : "Cadastrar usuário"}
          onPress={handleSubmit(submit)}
        ></Button>
      </VStack>
    </VStack>
  );
};
