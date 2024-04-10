const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Donne le ping du bot"),
  async execute(interaction) {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    const embed = {
      title: "Pong!",
      description: `Le ping est de ${ping}ms`,
      color: 12246104,
      footer: {
        text: interaction.user.username,
        iconUrl: interaction.user.displayAvatarURL(),
      },
    };

    await interaction.editReply({ embeds: [embed] });
  },
  inRandomCommand: true,
};
