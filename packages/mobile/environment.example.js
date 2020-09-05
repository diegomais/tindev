import Constants from 'expo-constants';

const sentryDsn = '';

const ENV = {
  dev: { sentryDsn },
  staging: { sentryDsn },
  prod: { sentryDsn },
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
