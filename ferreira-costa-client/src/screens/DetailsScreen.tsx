import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, VStack } from "native-base";
import { useState } from "react";
import { Button, Screen, Text } from "../components";
import { AppBar } from "../components/AppBar";
import { Modal } from "../components/Modal";
import { UserForm } from "../components/UserForm";
import { User } from "../types";
import usePutRequest from "../hooks/usePutRequest";
import { useListUsers } from "../hooks/useListUsers";

export const DetailsScreen = () => {
  const route = useRoute();
  const params = route.params as User;
  const [{users}, {setUsers}] = useListUsers()
  const user = users.find(u => u.id === params.id)
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prevState) => !prevState);
  const navigation = useNavigation()

  const onPressDeleteUser = () => {
    mutate({})
    toggleModal()
    setUsers([])
    navigation.goBack()
  };
  const { mutate } = usePutRequest(`/users/${params.id}`);

  return (
    <Screen>
      <AppBar label="Detalhes do usuário" />
      <UserForm isEditingUser={true} user={user} />
      <VStack px={8}>
        <Button
          bg="error.600"
          _pressed={{
            bg: "error.700",
          }}
          mb={4}
          label="Deletar usuário"
          onPress={toggleModal}
        ></Button>
      </VStack>
      <Modal dismiss={toggleModal} title="Atenção!" isOpen={showModal}>
        <VStack>
          <Text fontSize={"md"}>
            Você deseja <Text bold>deletar</Text> este usuário?
          </Text>
          <HStack justifyContent={"space-between"} mt={8}>
            <Button
              w={"45%"}
              bg={"error.600"}
              _pressed={{ bg: "error.700" }}
              label="Sim"
              borderRadius={8}
              onPress={onPressDeleteUser}
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
