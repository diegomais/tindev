import useAuth from "@/contexts/auth";
import MainScreen from "@/screens/main";
import SignInScreen from "@/screens/sign-in";

export default function Root() {
  const { userId } = useAuth();

  return userId ? <MainScreen /> : <SignInScreen />;
}
