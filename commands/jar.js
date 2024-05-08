const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("jar").setDescription("Just Jar."),
  async execute(interaction) {
    const jar = await fetch("https://i.imgur.com/2fBBkjm.png");
    await interaction.reply({
      content: `**Jar.**${jar}`,
      files: ["https://i.imgur.com/2fBBkjm.png"],
    });
  },
  cooldown: 5,
  inRandomCommand: true,
};
