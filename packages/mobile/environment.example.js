import Constants from 'expo-constants';

const apiUrl = '';
const sentryDsn = '';

const ENV = {
  dev: { apiUrl, sentryDsn },
  staging: { apiUrl, sentryDsn },
  prod: { apiUrl, sentryDsn },
};

const getEnvironmentVariables = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
  if (env === 'staging') {
    return ENV.staging;
  }
  if (env === 'prod') {
    return ENV.prod;
  }
  return undefined;
};

export default getEnvironmentVariables;
