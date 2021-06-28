import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import useAuth from '../contexts/auth'

import SignInScreen from '../screens/sign-in'
import HomeScreen from '../screens/home'

const Stack = createStackNavigator()

const Navigation = () => {
  const { userId } = useAuth()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userId ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
