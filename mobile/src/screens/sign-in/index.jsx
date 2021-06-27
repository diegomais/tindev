import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import useAuth from '../../contexts/auth';
import logo from '../../../assets/logo.png';
import styles from './styles';

export default function Login() {
  const [username, setUsername] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleSignIn = useCallback(
    (user) => {
      if (user.length > 0) signIn(user);
    },
    [signIn]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}>
      <Image source={logo} />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter your GitHub username"
        placeholderTextColor="#999"
        onChangeText={setUsername}
        style={styles.input}
        value={username}
      />

      <RectButton
        enabled={!isLoading && !!username}
        onPress={() => handleSignIn(username)}
        style={styles.button}>
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Sign in</Text>
        )}
      </RectButton>
    </KeyboardAvoidingView>
  );
}
