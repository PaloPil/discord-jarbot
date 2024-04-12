# IMPORTANT : TRANSLATE / TRADUCTION

Commencez par importer cela au début :

Start by importing this at the start :

```js
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");
```

À l'intérieur de la commande définissez le serveur (nommez comme vous voulez)

Then inside the command define the guild (name it as you want)

```js
const guild = await Guild.findOne({ id: interaction.guild.id });
```

Puis quand vous voulez répondre à un message mettez ceci (Remplacez COMMAND par le nom de la commande et string par le nom de la réponse):

Then when you need to reply to a message do it like this (Replace COMMAND by the command name and the string by the name of the response):

```js
lang("COMMAND")(guild.language, {
  string: "SUCCESS",
});
```

Ensuite dans le fichier de la langue correspondante changez comme ceci :

Then in the specific language file change like this :

```json
{
  "COMMANDS": [
    // Autres commandes... / Other commands ...
    {
      "NAME": "COMMAND",
      "SUCCESS": "✅ **SUCCESS!**",
      "FAILED": "❌ **FAILED!**"
    }
  ]
}
```

Si la réponse contient des arguments à changer (par exemple le nom de l'utilisateur) faites comme ceci :

If the reply contains some arguments to change (for example the username) do like this :

```js
lang("COMMAND")(guild.language, {
  string: "SUCCESS",
  user: interaction.user.tag,
  // Autres arguments ... / Other arguments ...
});
```

Puis dans la réponse mettez sous {} les arguments à changer

Then in the answer, put the arguments to be changed under {}.

```json
"SUCCESS": "✅ **{user}, SUCCESS!**"
```

# Exemple de commande

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("node:path");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

const command_name = path.basename(__filename).replace(".js", "");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(command_name)
    .setDescription("Description de la commande ici.")
    .setDescriptionLocalizations({
      "en-US": "English translation of description",
    })
    .addStringOption((option) =>
      option
        .setName("arg1")
        .setDescription("Description de l'argument ici.")
        .setDescriptionLocalizations({
          "en-US": "English translation of option",
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
  inRandomCommand: false, // Paramètre qui décide si oui ou non la commande peut être déclenché par la commande /random
  cooldown: 10, // EN SECONDES, si il n'y pas l'option : 5 secondes par défaut
};
```

# Autre exemple de commande

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
  inRandomCommand: false, // Paramètre qui décide si oui ou non la commande peut être déclenché par la commande /random
  cooldown: 10, // EN SECONDES, si il n'y pas l'option : 5 secondes par défaut
};
```
