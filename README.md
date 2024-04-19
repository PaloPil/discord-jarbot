# JARBot

**J**ust **A** **R**andom **Bot** - JARBot is just a random discord bot with some random commands, made with javascript *(and not with Java like the name could suggest)*.

It's a work in progress and if you want to add a command, feel free to submit a pull request!

You can find all the necessary informations to create your commands in our [**Guide**](/Guide/) *(Available in [English](/Guide/en/) and [French](/Guide/fr/))*.

# Build

```sh
git clone https://github.com/PaloPil/discord-jarbot.git
cd discord-jarbot
pnpm install
echo "TOKEN=" >> .env && echo "BLAGUETOKEN=" >> .env && echo "DBUSERNAME=" >> .env && echo "DBPASSWORD=" >> .env && echo "MONGOURI=" >> .env
```

> ❗ You must change your **`.env`** details by your [discord bot's token](https://discord.com/developers/applications), [Blagues-API token](https://www.blagues-api.fr/), and your [MongoDB details](https://www.mongodb.com)

> 💡 The **`MONGOURI`** env variable is what comes after the `@` in your MongoDB URI
