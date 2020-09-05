import React from 'react';
import * as Sentry from 'sentry-expo';
import getEnvironmentVariables from './environment';
import AppProvider from './src/contexts';
import Routes from './src/routes';

const { sentryDsn } = getEnvironmentVariables();

Sentry.init({ dsn: sentryDsn, enableInExpoDevelopment: true, debug: true });

export default function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}
