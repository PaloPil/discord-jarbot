const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("node:path");

const command_name = path.basename(__filename).replace(".js", "");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(command_name)
    .setDescription("Te spam de mentions.")
    .addIntegerOption((option) =>
      option
        .setName("nombre")
        .setDescription("Nombre de mentions à effectuer.")
        .setRequired(false)
        .setMaxValue(14)
    ),
  async execute(interaction) {
    const nombre = interaction.options.getInteger("nombre") ?? 5;

    await interaction.reply({
      content: "Etttt z'est partiiiii !",
      ephemeral: true,
    });

    function mention(num) {
      if (num > 0) {
        setTimeout(() => {
          interaction.followUp({
            content: `Hey <@${interaction.user.id}> !`,
            ephemeral: true,
          });
          mention(num - 1);
        }, 756);
      } else {
        interaction.followUp({
          content: "Voili voilou !",
          ephemeral: true,
        });
      }
    }

    mention(nombre);
  },
  cooldown: 10,
  inRandomCommand: true,
};
