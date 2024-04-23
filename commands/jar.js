const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jar")
    .setDescription("Just Jar."),
  async execute(interaction) {
    await interaction.reply({
      content: "**Jar.**",
      files: ["https://media.discordapp.net/attachments/1226533527156424844/1230515323778633778/jar.png?ex=663399b3&is=662124b3&hm=9978f69ec96ffd4bd7f0488fe12326baf227abe0704bd79d223251b3c92f44e4"],
    });
  },
  cooldown: 5,
  inRandomCommand: true,
};
