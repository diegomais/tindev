import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const RESTORE_TOKEN = 'RESTORE_TOKEN';
const SIGN_IN = 'SIGN_IN';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
const SIGN_OUT = 'SIGN_OUT';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [data, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case RESTORE_TOKEN:
        case SIGN_IN:
          return {
            ...prevState,
            user: action.user,
            isSignedIn: true,
            isLoading: false,
          };
        case SIGN_IN_REQUEST:
          return {
            ...prevState,
            isLoading: true,
          };
        case SIGN_IN_ERROR:
        case SIGN_OUT:
          return {
            ...prevState,
            user: null,
            isSignedIn: false,
            isLoading: false,
          };
        default:
          return prevState;
      }
    },
    { isLoading: false, isSignedIn: false, user: null }
  );

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        dispatch({ type: RESTORE_TOKEN, user });
      }
    });
  }, []);

  const signIn = useCallback(async (username) => {
    try {
      dispatch({ type: SIGN_IN_REQUEST });
      const response = await api.post('/devs', { username });
      const { _id } = response.data;
      await AsyncStorage.setItem('user', _id);
      dispatch({ type: SIGN_IN, user: _id });
    } catch (error) {
      dispatch({ type: SIGN_IN_ERROR });
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    dispatch({ type: SIGN_OUT });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading: data.isLoading, user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
