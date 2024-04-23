const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setlang")
    .setNameLocalizations({
      fr: "langue",
<<<<<<< HEAD
      "en-US": "setlang",
    })
    .setDescription("Changer la langue du bot")
    .setDescriptionLocalizations({
      fr: "Changer la langue du bot",
      "en-US": "Change bot's language",
    })
    .addStringOption((option) =>
      option
        .setName("language")
        .setNameLocalizations({
          fr: "langage",
          "en-US": "language",
        })
        .setDescription("Langue à définir")
        .setDescriptionLocalizations({
          fr: "Langue à définir",
          "en-US": "The language to change to",
=======
    })
    .setDescription("Changer la langue du bot")
    .setDescriptionLocalizations({
      "en-US": "Change bot's language",
    })
    .addStringOption((option) => {
      return option
        .setName("langue")
        .setNameLocalizations({
          "en-US": "language",
        })
        .setDescription("Langue à lequelle changer.")
        .setDescriptionLocalizations({
          "en-US": "The language to change to.",
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
        })
        .setRequired(true)
        .addChoices(
          { name: "Français", value: "fr" },
          { name: "English", value: "en" }
<<<<<<< HEAD
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const newLanguage = interaction.options.getString("language");
=======
        );
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const newLanguage = interaction.options.getString("langue");
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
    const guild = await Guild.findOneAndUpdate(
      { id: interaction.guild.id },
      { language: newLanguage },
      { new: true }
    );

<<<<<<< HEAD
    if (guild) {
      const success = lang("SETLANG")(guild.language, { string: "SUCCESS" });
      interaction.reply(success);
    } else {
      const failed = lang("SETLANG")(guild.language, { string: "FAILED" });
      interaction.reply(failed);
    }
  },
  cooldown: 0,
  inRandomCommand: true,
=======
    let ephemeral;

    guild ? (ephemeral = false) : (ephemeral = true);

    const response = lang("SETLANG")(guild.language, {
      string: ephemeral ? "FAILED" : "SUCCESS",
    });

    interaction.reply({ content: response, ephemeral: ephemeral });
  },
  cooldown: 0,
  needRefresh: true,
  inRandomCommand: false,
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
};
