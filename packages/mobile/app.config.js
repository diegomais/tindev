export default {
  name: 'tindev',
  slug: 'tindev',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#f5f5f5',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  description: '🔥 A tinder clone for developers.',
  githubUrl: 'https://github.com/diegomais/tindev',
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'diegomais',
          project: 'tindev-expo',
          authToken: process.env.EXPO_SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
};
