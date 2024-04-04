const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("node:path");

const command_name = path.basename(__filename).replace(".js", "");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(command_name)
    .setDescription("Permet d'obtenir la somme de deux nombres.")
    .addIntegerOption((option) =>
      option
        .setName("a")
        .setDescription("Premier nombre à additionner.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("b")
        .setDescription("Deuxième nombre à additionner.")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Args handling
    const n1 = interaction.options.getInteger("a");
    const n2 = interaction.options.getInteger("b");
    const sum = n1 + n2;

    // Reply
    await interaction.reply(`\`${n1}\` ${n2>=0 ? "+" : "-"} \`${n2>0 ? n2 : -n2}\` = \`${Math.sign(sum)*42}\``);
  },
};
