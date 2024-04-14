const { SlashCommandBuilder } = require("@discordjs/builders");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spam-me")
    .setDescription("Te spam de mentions.")
    .setDescriptionLocalizations({
      "en-US": "Spams you with mentions.",
    })
    .addIntegerOption((option) =>
      option
        .setName("nombre")
        .setNameLocalizations({
          "en-US": "number",
        })
        .setDescription("Nombre de mentions à effectuer.")
        .setDescriptionLocalizations({
          "en-US": "Number of mentions.",
        })
        .setRequired(false)
        .setMaxValue(14)
    ),
  async execute(interaction) {
    const nombre = interaction.options.getInteger("nombre") ?? 5;

    const guild = await Guild.findOne({ id: interaction.guild.id });

    await interaction.reply({
      content: lang("SPAM-ME")(guild.language, {
        string: "BEGIN_MESSAGE"
      }),
      ephemeral: true,
    });

    function mention(num) {
      if (num > 0) {
        setTimeout(() => {
          interaction.followUp({
            content: lang("SPAM-ME")(guild.language, {
              string: "PING_MESSAGE",
              userid: interaction.user.id
            }),
            ephemeral: true,
          });
          mention(num - 1);
        }, 756);
      } else {
        interaction.followUp({
          content: lang("SPAM-ME")(guild.language, {
            string: "ENDING_MESSAGE"
          }),
          ephemeral: true,
        });
      }
    }

    mention(nombre);
  },
  cooldown: 10,
  inRandomCommand: true,
};
