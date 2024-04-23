module.exports = {
  apps: [
    {
      name: "jarbot",
      script: "index.js",
      instances: "1",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        watch: true,
        NODE_ENV: "development",
      },
    },
  ],
};
