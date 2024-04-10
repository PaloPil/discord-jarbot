const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("node:path");

const command_name = path.basename(__filename).replace(".js", "");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(command_name)
    .setDescription("Description de la commande ici.")
    .addIntegerOption((option) =>
      option
        .setName("arg1")
        .setDescription("Description de l'argument ici.")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("arg2")
        .setDescription("Description de l'argument ici.")
        .setRequired(false)
    ),

  async execute(interaction) {
    console.log(`Commande '/${this.data.name}' reçue.`);
    // Args handling
    let arg1 = interaction.options.getInteger("arg1") || 0;
    let arg2 = interaction.options.getInteger("arg2") || 0;

    if (arg1 == 1) {
      await interaction.deferReply();
      setTimeout(async () => {
        await interaction.editReply(`Réponse`);
      }, 1000);
    } else {
      await interaction.deferReply({ ephemeral: true });
      setTimeout(async () => {
        await interaction.editReply(`Réponse`);
      }, 1000);
    }

    setTimeout(async () => {
      if (arg2 == 1) {
        await interaction.followUp(`Réponse following`);
      } else {
        await interaction.followUp({
          content: `Réponse following`,
          ephemeral: true,
        });
      }
    }, 5000);
  },
  inRandomCommand: false,
};
