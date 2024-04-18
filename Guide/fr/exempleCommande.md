# Exemple de commande n°1

```js
const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("command")
    .setDescription("Description of the command")
    .setDescriptionLocalizations({
      "fr": "Description de la commande en français",
    })
    .addStringOption((option) =>
      option
        .setName("arg1")
        .setDescription("Description of the option")
        .setDescriptionLocalizations({
          "fr": "Description de l'argument en français",
        })
        .setRequired(false)
    ),

  async execute(interaction) {
    const guild = await Guild.findOne({ id: interaction.guild.id });
    console.log(`Commande '/${this.data.name}' reçue.`);
    // Gestion des arguments
    let arg1 = interaction.options.getString("arg1") || 100; // 100 est la valeur par défaut
    console.log(
      lang("COMMAND")(guild.language, {
        string: "SUCCESS",
        arg1: arg1,
      })
    );
  },
  inRandomCommand: false, // Paramètre qui décide si oui ou non la commande peut être déclenché par la commande /random. Défaut : false
  cooldown: 10, // EN SECONDES. Défaut : 5 secondes
};
```

# Exemple de commande n°2

```js
const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nomDeCommande")
    .setDescription("Description de la commande ici."),
  async execute(interaction) {
    const guild = await Guild.findOne({ id: interaction.guild.id });
    interaction.reply(
      lang("COMMAND")(guild.language, {
        string: "SUCCESS",
      })
    );
  },
  inRandomCommand: false, // Paramètre qui décide si oui ou non la commande peut être déclenché par la commande /random. Défaut : false
  needRefresh: true, // Paramètre qui décide si oui ou non il y aura un refresh des données sur le serveur de la base de données avant de faire la commande. Pour éviter d'avoir des informations obsolètes, nécessaire pour certains cas spécifiques. Défaut : false
  cooldown: 10, // EN SECONDES. Défaut : 5 secondes
};
```
