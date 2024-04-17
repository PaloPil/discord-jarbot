const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")
    .setNameLocalizations({
      fr: "suggérer",
    })
    .setDescription("Suggérer une commande à ajouter sur le bot !")
    .setDescriptionLocalizations({
      "en-US": "Suggest a command to add!",
    })
    .addStringOption((option) => {
      return option
        .setName("title")
        .setNameLocalizations({
          fr: "titre",
        })
        .setDescription("Titre ou nom de ta commande !")
        .setDescriptionLocalizations({
          "en-US": "Title or name of your command!",
        })
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName("suggestion")
        .setDescription("Décris ta suggestion de commande")
        .setDescriptionLocalizations({
          "en-US": "Describe your suggestion!",
        })
        .setRequired(true);
    })
    .addBooleanOption((option) =>
      option
        .setName("community")
        .setNameLocalizations({
          fr: "communauté",
        })
        .setDescription(
          "Envoyer à la communauté du bot pour y voter ! (Désactivé par défaut)"
        )
        .setDescriptionLocalizations({
          "en-US":
            "Sends to the community so that they can vote! (disabled by default)",
        })
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const guildDB = await Guild.findOne({ id: interaction.guild.id });

    const guild = await interaction.client.guilds.fetch("1226328890717507658"); // Serveur support
    const title = interaction.options.getString("title");
    const community = interaction.options.getBoolean("community");
    const suggest = interaction.options.getString("suggestion");
    const user = await interaction.guild.members.fetch(interaction.user.id);

    let suggestEmbed;
    let channel;
    if (community) {
      channel = await guild.channels.fetch("1229148437308510238"); // Salon de suggestion communauté
      suggestEmbed = new EmbedBuilder()
        .setColor("#74b9ff")
        .setTitle(title)
        .addFields(
          {
            name: `**Suggéré par l'utilisateur :**`,
            value: `\`${interaction.user.tag} (${interaction.user.id})\``,
            inline: true,
          },
          {
            name: "**Suggestion :**",
            value: `\`\`\`\n${suggest}\n\`\`\``,
          }
        );
      this.cooldown = 30;
    } else {
      channel = await guild.channels.fetch("1226332016858103909"); // Salon de suggestion du support
      suggestEmbed = new EmbedBuilder()
        .setColor("#9b59b6")
        .setTitle("title")
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
      this.cooldown = 15;
    }

    try {
      const message = await channel.send({ embeds: [suggestEmbed] });
      await channel.threads.create({
        name: title,
        startMessage: message,
        reason: "Nouvelle suggestion de commande !",
      });
      message.react("✅");
      message.react("➖");
      message.react("❌");
    } catch (e) {
      console.log(e);
      interaction.editReply(
        lang("SUGGEST")(guildDB.language, {
          string: "ERROR_CANNOT_SEND_SUGGEST",
        })
      );
    }

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
