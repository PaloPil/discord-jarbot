➡️ Changer vers la version [Française](README_FR.md).

# JARBot

**J**ust **A** **R**andom **Bot** - JARBot is just a random discord bot with some random commands, made with javascript _(and not with Java like the name could suggest)_.

It's a work in progress and if you want to add a command, feel free to submit a pull request!

You can find all the necessary informations to create your commands in our [**Guide**](/Guide/) _(Available in [English](/Guide/en/) and [French](/Guide/fr/))_.

# Build

> _Change `pnpm install` by your package manager if you don't use [PNPM](https://pnpm.io/)_

```sh
git clone https://github.com/PaloPil/discord-jarbot.git
cd discord-jarbot
pnpm install
echo "TOKEN=" >> .env && echo "BLAGUETOKEN=" >> .env && echo "DBUSERNAME=" >> .env && echo "DBPASSWORD=" >> .env && echo "MONGOURI=" >> .env && echo "CATAPI=" > .env
```

> ❗ You must change your **`.env`** details by your [discord bot's token](https://discord.com/developers/applications), [Blagues-API token](https://www.blagues-api.fr/), your [MongoDB details](https://www.mongodb.com) and [TheCatAPI Key](https://thecatapi.com)

> 💡 The **`MONGOURI`** env variable is what comes after the `@` in your MongoDB URI
