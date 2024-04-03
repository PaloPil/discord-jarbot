const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("colordecimal")
    .setDescription("Convertis un code couleur hexadécimal en décimal")
    .addStringOption((option) =>
      option
        .setName("hexcolor")
        .setDescription("Le code hexadécimal à convertir")
        .setRequired(true)
    ),
  async execute(interaction) {
    const hexColor = interaction.options.getString("hexcolor");
    if (!/^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/i.test(hexColor)) {
      return interaction.reply(
        "Veuillez indiquez un code couleur hexadécimal correcte."
      );
    }
    const decimalColor = parseInt(hexColor.replace("#", ""), 16);

    const embed = {
      title: "Voici le résultat !",
      description: `Le code décimal : ${decimalColor}`,
      color: decimalColor,
      footer: {
        text: interaction.user.username,
        iconUrl: interaction.user.displayAvatarURL(),
      },
    };

    await interaction.reply({ embeds: [embed] });
  },
};
