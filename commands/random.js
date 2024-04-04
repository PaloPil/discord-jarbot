const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("node:path");

const command_name = path.basename(__filename).replace(".js", "");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(command_name)
    .setDescription("Donne un nombre aléatoire entre 0 et 100. (configurable)")
    .addIntegerOption((option) =>
      option
        .setName("max")
        .setDescription("Description de l'argument ici.")
        .setRequired(false)
        .setMinValue(1)
    ),

  async execute(interaction) {
    const max = interaction.options.getInteger("max") || 100;

    let num = 42; // The number to be returned

    num = num/100;
    while (10*num <= max) {
      num *= 10;
    }

    await interaction.reply(`**Voici votre nombre aléatoire :** \`${num}\``);
  },
};