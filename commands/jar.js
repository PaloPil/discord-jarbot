const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("jar").setDescription("Just Jar."),
  async execute(interaction) {
    await interaction.reply({
      content: "**Jar.**",
      files: ["./images/jar.png"],
    });
  },
  cooldown: 5,
  inRandomCommand: true,
};
