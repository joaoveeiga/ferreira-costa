import { MaterialIcons } from "@expo/vector-icons";
import {
  Center,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  VStack,
} from "native-base";
import { Text } from "./Text";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const AppBar = ({ label }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const canGoBack = navigation.canGoBack();
  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const logout = () => navigation.navigate("AuthNavigator", {
   screen: "SignUpScreen" 
  })

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(prevState => !prevState)

  return (
    <VStack>
      <StatusBar backgroundColor="#002851" barStyle="light-content" />
      <HStack
        bg="darkBlue.800"
        px="1"
        py="2"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack w="full" alignItems="center">
          {canGoBack ? (
            <IconButton
              onPress={navigateBack}
              icon={
                <Icon
                  size="md"
                  as={<MaterialIcons name="arrow-back" />}
                  color="white"
                />
              }
            />
          ) : (
            <Icon
              size="md"
              as={<MaterialIcons name="arrow-back" />}
              color="darkBlue.800"
            />
          )}
          <HStack justifyContent={"space-between"} w="90%">
            <Text color="white" fontSize="20" fontWeight="bold">
              {label}
            </Text>
            <Center>
              <Icon
                size="md"
                as={<MaterialIcons name="logout" />}
                name="menu"
                color="white"
                onPress={toggleModal}
              />
            </Center>
          </HStack>
        </HStack>
      </HStack>
      <Modal dismiss={toggleModal} title="Sair" isOpen={showModal}>
        <VStack>
          <Text fontSize={"md"}>
            Você deseja <Text bold>sair</Text>?
          </Text>
          <HStack justifyContent={"space-between"} mt={8}>
            <Button
              w={"45%"}
              bg={"blueGray.600"}
              _pressed={{ bg: "blueGray.700" }}
              label="Sim"
              borderRadius={8}
              onPress={logout}
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
    </VStack>
  );
};
