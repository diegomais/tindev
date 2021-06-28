import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import AppProvider from './contexts'
import Navigation from './navigation'

const App = () => (
  <AppProvider>
    <StatusBar style="auto" />
    <Navigation />
  </AppProvider>
)

registerRootComponent(App)
