const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Exécute une commande aléatoire"),
    async execute(interaction) {

        const commands = interaction.client.commands
        const randomableCommands = commands.filter((cmd) => { cmd.value.inRandomCommand })
        const selectedCommand = randomableCommands[Math.floor(Math.random() * randomableCommands.length)]
        selectedCommand.value.execute(interaction)
    },
    inRandomCommand: false
};
