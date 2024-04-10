# Exemple de commande

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("node:path");

const command_name = path.basename(__filename).replace(".js", "");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(command_name)
    .setDescription("Description de la commande ici.")
    .addStringOption((option) =>
      option
        .setName("arg1")
        .setDescription("Description de l'argument ici.")
        .setRequired(false)
    ),

  async execute(interaction) {
    console.log(`Commande '/${this.data.name}' reçue.`);
    // Args handling
    let arg1 = interaction.options.getString("arg1") || 100; // 100 is the default value
    console.log(`Arg1: ${arg1}`);
  },
  inRandomCommand: false, // Paramètre qui décide si oui ou non la commande peut être déclenché par la commande /random
  cooldown: 10, // EN SECONDES, si il n'y pas l'option : 5 secondes par défaut
};
```

# Autre exemple de commande
```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nomDeCommande")
    .setDescription("Description de la commande ici.")

  async execute(interaction) {
      interaction.reply("Salut!")
  },
  inRandomCommand: false, // Paramètre qui décide si oui ou non la commande peut être déclenché par la commande /random
  cooldown: 10, // EN SECONDES, si il n'y pas l'option : 5 secondes par défaut
};
```
