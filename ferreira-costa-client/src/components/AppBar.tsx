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
import { useNavigation } from "@react-navigation/native";

export const AppBar = ({ label }) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

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
                  name="menu"
                  color="white"
                />
              }
            />
          ) : (
            <Icon
              size="md"
              as={<MaterialIcons name="train" />}
              name="menu"
              color="darkBlue.800"
            />
          )}
          <Text color="white" fontSize="20" fontWeight="bold">
            {label}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};
