module.exports = {
  apps: [
    {
<<<<<<< HEAD
      name: "bot",
=======
      name: "jarbot",
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
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
