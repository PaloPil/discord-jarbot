const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("colordecimal")
    .setDescription("Turn hexadecimal color to decimal")
    .addStringOption((option) =>
      option
        .setName("hexcolor")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    const hexColor = interaction.options.getString("hexcolor");
    if (!/^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/i.test(hexColor)) {
      return interaction.reply(
        "Please provide a valid hexadecimal color code."
      );
    }
    const decimalColor = parseInt(hexColor.replace("#", ""), 16);

    const embed = {
      title: "Here is your result !",
      description: `Decimal color value : ${decimalColor}`,
      color: decimalColor,
      footer: {
        text: interaction.user.username,
        iconUrl: interaction.user.displayAvatarURL(),
      },
    };

    await interaction.reply({ embeds: [embed] });
  },
};
