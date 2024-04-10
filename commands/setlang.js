const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setlang")
    .setNameLocalizations({
      fr: "langue",
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
        })
        .setRequired(true)
        .addChoices(
          { name: "Français", value: "fr" },
          { name: "English", value: "en" }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const newLanguage = interaction.options.getString("language");
    const guild = await Guild.findOneAndUpdate(
      { id: interaction.guild.id },
      { language: newLanguage },
      { new: true }
    );

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
};
