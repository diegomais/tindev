import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";

import useAuth from "@/contexts/auth";
import { styles as s } from "./styles";

const SignInScreen = () => {
  const { signIn, isLoading } = useAuth();
  const [username, setUsername] = useState("");

  const handleSignIn = useCallback(
    (user: string) => {
      if (user.length > 0) {
        signIn(user);
      }
    },
    [signIn]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === "ios"}
      style={s.container}
    >
      <Image source={require("@/assets/images/logo.png")} />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter your GitHub username"
        placeholderTextColor="#999"
        onChangeText={setUsername}
        style={s.input}
        value={username}
      />

      <RectButton
        enabled={!isLoading && !!username}
        onPress={() => handleSignIn(username)}
        style={s.button}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={s.buttonText}>Sign in</Text>
        )}
      </RectButton>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
