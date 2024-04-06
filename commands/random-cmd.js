const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Exécute une commande aléatoire"),
  async execute(interaction) {
    const commands = interaction.client.commands;
    const commandsArray = Array.from(commands, ([name, value]) => ({
      name,
      value,
    }));
    const randomableCommands = commandsArray.filter(function (v) {
      return v.value.inRandomCommand;
    });
    const selectedCommand = randomableCommands.random();
    selectedCommand.value.execute(interaction);
  },
  inRandomCommand: false,
};
