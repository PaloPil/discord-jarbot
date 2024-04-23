const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggérer une commande à ajouter sur le bot !")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Titre ou nom de ta commande !")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("suggestion")
        .setDescription("Décris ta suggestion de commande")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("community")
        .setDescription(
          "Envoyer à la communauté du bot pour y voter ! (Désactivé par défaut)"
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const guildDB = await Guild.findOne({ id: interaction.guild.id });
    const user = await interaction.guild.members.fetch(interaction.user.id);

    // Switching between community's channel or support's channels
    const channelId = interaction.options.getBoolean("community")
      ? "1229148437308510238" // Community channel
      : "1226332016858103909"; // Support channel
    const guild = await interaction.client.guilds.fetch("1226328890717507658");
    const channel = await guild.channels.fetch(channelId);

    // Creating suggestion message's embed
    const title = interaction.options.getString("title");
    const suggest = interaction.options.getString("suggestion");
    const suggestEmbed = new EmbedBuilder()
      .setColor(
        interaction.options.getBoolean("community") ? "#74b9ff" : "#9b59b6"
      )
      .setTitle(title)
      .addFields(
        {
          name: "**Suggested by :**",
          value: `\`${interaction.user.tag} (${interaction.user.id})\``,
          inline: true,
        },
        ...(interaction.options.getBoolean("community")
          ? []
          : [
              {
                name: "**From :**",
                value: `\`${interaction.guild.name} (${interaction.guild.id})\``,
                inline: true,
              },
            ]),
        { name: "**Suggestion :**", value: `\`\`\`\n${suggest}\n\`\`\`` }
      );

    try {
      // Sending the suggestion and creating thread for it
      const message = await channel.send({ embeds: [suggestEmbed] });
      await channel.threads.create({
        name: title,
        startMessage: message,
        reason: "New Suggestion",
      });
      message.react("✅");
      message.react("➖");
      message.react("❌");
    } catch (e) {
      console.error(e);
      await interaction.editReply(
        lang("SUGGEST")(guildDB.language, {
          string: "ERROR_CANNOT_SEND_SUGGEST",
        })
      );
    }

    // Sending the respnse
    const embed = new EmbedBuilder()
      .setColor("#52fa56")
      .setTitle(lang("SUGGEST")(guildDB.language, { string: "EMBED_TITLE" }))
      .setDescription(
        lang("SUGGEST")(guildDB.language, { string: "EMBED_DESCRIPTION" })
      )
      .setAuthor({ name: user.displayName, iconURL: user.displayAvatarURL() })
      .setImage(interaction.client.user.displayAvatarURL());

    await interaction.editReply({ embeds: [embed] });
  },
  cooldown: Number,
  inRandomCommand: false,
};
