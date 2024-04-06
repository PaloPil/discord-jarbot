const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("free-nitro")
    .setDescription("Génère un code discord nitro gratuit !"),
  async execute(interaction) {
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle("Chargement...")
      .setDescription("**Téléchargement de Nitro gratuit...**")
      .setFooter({
        text: "Veuillez patienter, cela peut prendre quelques minutes.",
      });

    await interaction.editReply({ embeds: [embed] });

    const waitTime = [1000, 1500, 2000, 2500, 3000, 4000];

    const loadingMessage = ["15%", "30%", "45%", "60%", "80%", "99%"];

    for (let i = 0; i < loadingMessage.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, waitTime[i]));
      embed.setDescription(
        `**Génération du nitro gratuit... ${loadingMessage[i]}**`
      );
      await interaction.editReply({ embeds: [embed] });
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    embed
      .setTitle("**Génération terminé !**")
      .setDescription(
        `**Cliquez [ici](https://r.mtdv.me/get-free-nitro) pour activer votre Nitro gratuit !**`
      )
      .setColor("#ff0000")
      .setFooter({ text: "Merci d'avoir attendu." });
    await interaction.editReply({ embeds: [embed] });
  },
};
