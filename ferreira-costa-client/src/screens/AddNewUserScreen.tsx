import { useRoute } from "@react-navigation/native";
import { Screen } from "../components";
import { AppBar } from "../components/AppBar";
import { UserForm } from "../components/UserForm";

type AddNewUserScreenProps = {
  label?: string;
};

export const AddNewUserScreen = ({
  label = "Novo usuário",
}: AddNewUserScreenProps) => {
  const route = useRoute();
  const { label: routeLabel } = (route?.params as AddNewUserScreenProps) ?? {};
  return (
    <Screen>
      <AppBar label={routeLabel ?? label} />
      <UserForm />
    </Screen>
  );
};
