module.exports = {
  apps: [
    {
      name: 'api',
      script: './src/server.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
