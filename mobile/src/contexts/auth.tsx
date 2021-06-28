import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import api from '../services/api'

type AuthContextType = {
  isLoading: boolean
  signIn(username: string): Promise<void>
  signOut(): void
  userId: string | null
}

type AuthProviderProps = {
  children: React.ReactNode
}

type ActionType =
  | { type: typeof RESTORE_TOKEN; payload: string }
  | { type: typeof SIGN_IN; payload: string }
  | { type: typeof SIGN_IN_REQUEST }
  | { type: typeof SIGN_IN_ERROR }
  | { type: typeof SIGN_OUT }

type StateType = {
  isLoading: boolean
  isSignedIn: boolean
  userId: string | null
}

const RESTORE_TOKEN = 'RESTORE_TOKEN'
const SIGN_IN = 'SIGN_IN'
const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
const SIGN_OUT = 'SIGN_OUT'

const STORAGE_KEY = '@tindev:userId'

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const initialState: StateType = {
  isLoading: false,
  isSignedIn: false,
  userId: null,
}

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case RESTORE_TOKEN:
    case SIGN_IN:
      return {
        ...state,
        isLoading: false,
        userId: action.payload,
      }
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case SIGN_IN_ERROR:
    case SIGN_OUT:
      return {
        ...state,
        isLoading: false,
        userId: null,
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((userId) => {
      if (userId) {
        dispatch({ type: RESTORE_TOKEN, payload: userId })
      }
    })
  }, [])

  const signIn = useCallback(async (username) => {
    try {
      dispatch({ type: SIGN_IN_REQUEST })
      const response = await api.post('/devs', { username })
      const { _id } = response.data
      await AsyncStorage.setItem(STORAGE_KEY, _id)
      dispatch({ type: SIGN_IN, payload: _id })
    } catch (error) {
      dispatch({ type: SIGN_IN_ERROR })
    }
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY)
    dispatch({ type: SIGN_OUT })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoading: data.isLoading,
        userId: data.userId,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
