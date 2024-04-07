const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggérer une commande à ajouter sur le bot !")
    .addStringOption((option) => {
      return option
        .setName("suggestion")
        .setDescription("Décris ta suggestions de commande")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guild = await interaction.client.guilds.fetch("1226328890717507658"); // Serveur support
    const channel = await guild.channels.fetch("1226332016858103909"); // Salon de suggestion du support
    const suggest = await interaction.options.getString("suggestion");
    const user = await interaction.guild.members.fetch(interaction.user.id);

    const suggestEmbed = new EmbedBuilder()
      .setColor("#9b59b6")
      .setTitle("Une nouvelle suggestion !")
      .addFields(
        {
          name: `**Suggéré par l'utilisateur :**`,
          value: `\`${interaction.user.tag} (${interaction.user.id})\``,
          inline: true,
        },
        {
          name: "**Depuis le serveur :**",
          value: `\`${user.guild.name} (${user.guild.id})\``,
          inline: true,
        },
        {
          name: "**Suggestion :**",
          value: `\`\`\`\n${suggest}\n\`\`\``,
        }
      );

    try {
      const message = await channel.send({ embeds: [suggestEmbed] });
      await channel.threads.create({
        name: `Suggestion de ${interaction.user.tag}`,
        startMessage: message,
        reason: "Nouvelle suggestion de commande !",
      });
    } catch (e) {
      interaction.editReply(
        ":x: **Il y'a eu une erreur lors de l'envoi de la suggestion. Réessayez ou contactez le support.**\n" +
          e
      );
    }

    const embed = new EmbedBuilder()
      .setColor("#52fa56")
      .setTitle("Votre suggestion a bien été envoyé !")
      .setDescription("**Merci pour votre suggestion !**")
      .setAuthor({ name: user.displayName, iconURL: user.displayAvatarURL() })
      .setImage(interaction.client.user.displayAvatarURL());

    await interaction.editReply({ embeds: [embed] });
  },
  cooldown: 15,
  inRandomCommand: false,
};
