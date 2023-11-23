import { Screen } from "../components";
import { AppBar } from "../components/AppBar";
import { UserForm } from "../components/UserForm";

export const SignUpScreen = () => {
  return (
    <Screen>
      <AppBar label="Crie sua conta" />
      <UserForm />
    </Screen>
  );
};
