const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("colordecimal")
    .setDescription(
      "Convertis un code couleur hexadécimal en décimal ou donne un aléatoire"
    )
    .setDescriptionLocalizations({
      "en-US":
        "Converts a hexadecimal color code to decimal or give a random one",
    })
    .addStringOption((option) =>
      option
        .setName("hexcolor")
        .setDescription("Le code hexadécimal à convertir")
        .setDescriptionLocalizations({
          "en-US": "The hex color to convert to",
        })
        .setRequired(false)
    ),
  async execute(interaction) {
    const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const hexColor = interaction.options.getString("hexcolor") ?? randomHex;
    const guild = await Guild.findOne({ id: interaction.guild.id });

    if (!/^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/i.test(hexColor)) {
      await interaction.deferReply({ ephemeral: true });
      return interaction.editReply(
        lang("COLORDECIMAL")(guild.language, {
          string: "ERROR_INCORRECT_CODE",
        })
      );
    }
    const decimalColor = parseInt(hexColor.replace("#", ""), 16);

    const embed = {
      title: lang("COLORDECIMAL")(guild.language, {
        string: "EMBED_TITLE",
      }),
      description: lang("COLORDECIMAL")(guild.language, {
        string: "EMBED_DESCRIPTION",
        hexColor: hexColor,
        decimalColor: decimalColor,
      }),
      color: decimalColor,
      footer: {
        text: interaction.user.username,
        iconUrl: interaction.user.displayAvatarURL(),
      },
    };

    await interaction.reply({
      embeds: [embed],
    });
  },
  cooldown: 0,
  inRandomCommand: true,
};
