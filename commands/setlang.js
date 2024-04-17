const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setlang")
    .setNameLocalizations({
      fr: "langue",
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
        })
        .setRequired(true)
        .addChoices(
          { name: "Français", value: "fr" },
          { name: "English", value: "en" }
        );
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const newLanguage = interaction.options.getString("langue");
    const guild = await Guild.findOneAndUpdate(
      { id: interaction.guild.id },
      { language: newLanguage },
      { new: true }
    );

    let ephemeral;
    if (guild) {
      ephemeral = false;
    } else {
      ephemeral = true;
    }
    const response = lang("SETLANG")(guild.language, {
      string: ephemeral ? "FAILED" : "SUCCESS",
    });

    interaction.reply({ content: response, ephemeral: ephemeral });
  },
  cooldown: 0,
  needRefresh: false,
  inRandomCommand: false,
};
