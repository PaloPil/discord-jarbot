➡️ Return to [English](README.md).

# JARBot

**J**ust **A** **R**andom **Bot** - JARBot est juste un bot Discord random avec des commandes un peu aléatoires, fait en JavaScript _(et non pas en Java comme pourrait le suggérer son nom)_.

C'est un projet en développement et si vous voulez ajouter un commande, n'hésitez pas à faire une pull request!

Vous trouverz toutes les informations nécessaires pour créer vos commandes dans notre [**Guide**](/Guide/) _(Disponible en [français](/Guide/fr/) et en [anglais](/Guide/en/))_.

# Build

> _Changez `pnpm install` par votre gestionnaire de packages si vous n'utilisez pas [PNPM](https://pnpm.io/)_

```sh
git clone https://github.com/PaloPil/discord-jarbot.git
cd discord-jarbot
pnpm install
echo "TOKEN=" >> .env && echo "BLAGUETOKEN=" >> .env && echo "DBUSERNAME=" >> .env && echo "DBPASSWORD=" >> .env && echo "MONGOURI=" >> .env
```

> ❗ Vous devez changer les détails de votre **`.env`** par votre [token de bot discord](https://discord.com/developers/applications), [token Blagues-API](https://www.blagues-api.fr/), et vos [détails MongoDB](https://www.mongodb.com)

> 💡 La variable d'environnement **`MONGOURI`** est ce qui suit le `@` dans votre URI MongoDB
