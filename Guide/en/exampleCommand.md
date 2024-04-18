# Example command n°1

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
    // Args handling
    let arg1 = interaction.options.getString("arg1") || 100; // 100 is the default value
    console.log(
      lang("COMMAND")(guild.language, {
        string: "SUCCESS",
        arg1: arg1,
      })
    );
  },
  inRandomCommand: false, // Option to decide whether or not the command can be triggered by the /random command. Default: false
  cooldown: 10, // IN SECONDS. Default: 5 seconds
};
```

# Example command n°2

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
  inRandomCommand: false, // Option to decide whether or not the command can be triggered by the /random command. Default: false
  needRefresh: true, // Option to decide whether or not there will be a refresh of the data on the database server before executing the command. To avoid having outdated information, necessary for some specific cases. Default: false
  cooldown: 10, // IN SECONDS. Default: 5 seconds
};
```