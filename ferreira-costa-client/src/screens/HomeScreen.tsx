import { Feather } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Center, FlatList, HStack, Pressable, VStack } from "native-base";
import { useState } from "react";
import { Button, Screen, Text } from "../components";
import { AppBar } from "../components/AppBar";
import { Modal } from "../components/Modal";
import { User } from "../types";

const firstUsers: User[] = [
  {
    name: "Fulano de Tal",
    login: "fulano",
    password: "123456",
    passwordConfirmation: "123456",
    email: "fulano@example.com",
    phoneNumber: "11999999999",
    cpf: "123456789012",
    birthday: "1990-01-01",
    motherName: "Maria da Silva",
    status: "ativo",
  },
  {
    name: "Beltrano de Tal",
    login: "beltrano",
    password: "abcdef",
    passwordConfirmation: "abcdef",
    email: "beltrano@example.com",
    phoneNumber: "11988888888",
    cpf: "987654321098",
    birthday: "1991-02-02",
    motherName: "Ana Paula",
    status: "desativado",
  },
  {
    name: "Ciclano de Tal",
    login: "ciclano",
    password: "ghijkl",
    passwordConfirmation: "ghijkl",
    email: "ciclano@example.com",
    phoneNumber: "11777777777",
    cpf: "765432109876",
    birthday: "1992-03-03",
    motherName: "Josilene",
    status: "pendente",
  },
  {
    name: "Fulano de Tal",
    login: "fulano",
    password: "123456",
    passwordConfirmation: "123456",
    email: "fulano@example.com",
    phoneNumber: "11999999999",
    cpf: "123456789012",
    birthday: "1990-01-01",
    motherName: "Maria da Silva",
    status: "ativo",
  },
  {
    name: "Beltrano de Tal",
    login: "beltrano",
    password: "abcdef",
    passwordConfirmation: "abcdef",
    email: "beltrano@example.com",
    phoneNumber: "11988888888",
    cpf: "987654321098",
    birthday: "1991-02-02",
    motherName: "Ana Paula",
    status: "desativado",
  },
  {
    name: "Ciclano de Tal",
    login: "ciclano",
    password: "ghijkl",
    passwordConfirmation: "ghijkl",
    email: "ciclano@example.com",
    phoneNumber: "11777777777",
    cpf: "765432109876",
    birthday: "1992-03-03",
    motherName: "Josilene",
    status: "pendente",
  },
  {
    name: "Fulano de Tal",
    login: "fulano",
    password: "123456",
    passwordConfirmation: "123456",
    email: "fulano@example.com",
    phoneNumber: "11999999999",
    cpf: "123456789012",
    birthday: "1990-01-01",
    motherName: "Maria da Silva",
    status: "ativo",
  },
  {
    name: "Beltrano de Tal",
    login: "beltrano",
    password: "abcdef",
    passwordConfirmation: "abcdef",
    email: "beltrano@example.com",
    phoneNumber: "11988888888",
    cpf: "987654321098",
    birthday: "1991-02-02",
    motherName: "Ana Paula",
    status: "desativado",
  },
  {
    name: "Ciclano de Tal",
    login: "ciclano",
    password: "ghijkl",
    passwordConfirmation: "ghijkl",
    email: "ciclano@example.com",
    phoneNumber: "11777777777",
    cpf: "765432109876",
    birthday: "1992-03-03",
    motherName: "Josilene",
    status: "pendente",
  },
  {
    name: "Fulano de Tal",
    login: "fulano",
    password: "123456",
    passwordConfirmation: "123456",
    email: "fulano@example.com",
    phoneNumber: "11999999999",
    cpf: "123456789012",
    birthday: "1990-01-01",
    motherName: "Maria da Silva",
    status: "ativo",
  },
  {
    name: "Beltrano de Tal",
    login: "beltrano",
    password: "abcdef",
    passwordConfirmation: "abcdef",
    email: "beltrano@example.com",
    phoneNumber: "11988888888",
    cpf: "987654321098",
    birthday: "1991-02-02",
    motherName: "Ana Paula",
    status: "desativado",
  },
  {
    name: "Ciclano de Tal",
    login: "ciclano",
    password: "ghijkl",
    passwordConfirmation: "ghijkl",
    email: "ciclano@example.com",
    phoneNumber: "11777777777",
    cpf: "765432109876",
    birthday: "1992-03-03",
    motherName: "Josilene",
    status: "pendente",
  },
];

export const HomeScreen = () => {
  const [users, setUsers] = useState(firstUsers);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const toggleModal = () => setShowModal((prevState) => !prevState);
  const onPressNewUserButton = () => navigation.navigate("AuthNavigator", {
    screen: 'AddNewUserScreen'
  });

  const separator = () => <VStack h={0.5} my={3} bg="blueGray.300" />;
  const listEmptyData = () => {
    return (
      <Center>
        <Text>Ainda não há usuários cadastrados.</Text>
      </Center>
    );
  };

  const renderItem = ({ item }: { item: User }) => {
    return (
      <HStack borderRadius={8} bg={"white"} p={4}>
        <VStack w="95%">
          <Text>
            <Text bold>Nome:</Text> {item.name}
          </Text>
          <Text my={0.5}>
            <Text bold>CPF:</Text> {item.cpf}
          </Text>
          <Text>
            <Text bold>Data de nascimento:</Text>
            {item.birthday}
          </Text>
        </VStack>
        <Pressable
          onPress={() =>
            navigation.navigate("DetailsScreen", {
              name: item.name,
              login: item.login,
              password: item.password,
              passwordConfirmation: item.password,
              email: item.email,
              phoneNumber: item.phoneNumber,
              cpf: item.cpf,
              birthday: item.birthday,
              motherName: item.motherName,
              status: item.status,
            })
          }
        >
          <Feather name="edit" />
        </Pressable>
      </HStack>
    );
  };
  return (
    <Screen>
      <AppBar label="Home" />
      <VStack my={4} flex={1} px={8}>
        <FlatList
          flex={1}
          data={users}
          ListEmptyComponent={listEmptyData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          // onScrollEndDrag={() => {
          //   setUsers((prevState) => [...prevState, ...prevState]);
          // }}
          ItemSeparatorComponent={separator}
          ListFooterComponent={<VStack my={2} />}
        />
        <VStack>
          <Button
            mb={2}
            label="Adicionar novo usuário"
            onPress={onPressNewUserButton}
          ></Button>
          <Button
            mb={2}
            bg={"error.600"}
            _pressed={{
              bg: "error.700",
            }}
            label="Deletar todos os usuários"
            onPress={toggleModal}
          ></Button>
        </VStack>
      </VStack>
      <Modal dismiss={toggleModal} title="Atenção!" isOpen={showModal}>
        <VStack>
          <Text fontSize={"md"}>
            Você deseja <Text bold>deletar todos</Text> os usuários?
          </Text>
          <HStack justifyContent={"space-between"} mt={8}>
            <Button
              w={"45%"}
              bg={"error.600"}
              _pressed={{ bg: "error.700" }}
              label="Sim"
              borderRadius={8}
            />
            <Button
              w={"45%"}
              label="Não"
              borderRadius={8}
              onPress={toggleModal}
            />
          </HStack>
        </VStack>
      </Modal>
    </Screen>
  );
};
