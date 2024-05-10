const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Suggérer une commande à ajouter sur le bot !")
    .setDescriptionLocalizations({
      "en-US": "Suggest a command to add to the bot!",
    }),
  async execute(interaction) {
    const guildDB = await Guild.findOne({ id: interaction.guild.id });

    const popup = new ModalBuilder()
      .setCustomId("suggestion")
      .setTitle(lang("SUGGEST")(guildDB.language, { string: "POPUP_TITLE" }));

    const titleInput = new TextInputBuilder()
      .setCustomId("title")
      .setLabel(lang("SUGGEST")(guildDB.language, { string: "TITLE_LABEL" }))
      .setPlaceholder(
        lang("SUGGEST")(guildDB.language, { string: "TITLE_PLACEHOLDER" })
      )
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const suggestionInput = new TextInputBuilder()
      .setCustomId("suggestion")
      .setLabel(
        lang("SUGGEST")(guildDB.language, { string: "SUGGESTION_LABEL" })
      )
      .setPlaceholder(
        lang("SUGGEST")(guildDB.language, { string: "SUGGESTION_PLACEHOLDER" })
      )
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const communityInput = new TextInputBuilder()
      .setCustomId("community")
      .setLabel(
        lang("SUGGEST")(guildDB.language, { string: "COMMUNITY_LABEL" })
      )
      .setPlaceholder(
        lang("SUGGEST")(guildDB.language, { string: "COMMUNITY_PLACEHOLDER" })
      )
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const titleRow = new ActionRowBuilder().addComponents(titleInput);
    const suggestionRow = new ActionRowBuilder().addComponents(suggestionInput);
    const communityRow = new ActionRowBuilder().addComponents(communityInput);

    popup.addComponents(titleRow, suggestionRow, communityRow);

    await interaction.showModal(popup);
  },
  async executeModal(interaction) {
    const guildDB = await Guild.findOne({ id: interaction.guild.id });
    const user = await interaction.guild.members.fetch(interaction.user.id);

    const title = interaction.fields.getTextInputValue("title");
    const suggest = interaction.fields.getTextInputValue("suggestion");
    const community = interaction.fields.getTextInputValue("community");

    const channelId = community ? "1229148437308510238" : "1226332016858103909";
    const guild = await interaction.client.guilds.fetch("1226328890717507658");
    const channel = await guild.channels.fetch(channelId);

    const suggestEmbed = new EmbedBuilder()
      .setColor(community ? "#74b9ff" : "#9b59b6")
      .setTitle(title)
      .addFields(
        {
          name: "**Suggested by :**",
          value: `\`${interaction.user.tag} (${interaction.user.id})\``,
          inline: true,
        },
        ...(community
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
      await interaction.reply({
        content: lang("SUGGEST")(guildDB.language, {
          string: "ERROR_CANNOT_SEND_SUGGEST",
        }),
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#52fa56")
      .setTitle(lang("SUGGEST")(guildDB.language, { string: "EMBED_TITLE" }))
      .setDescription(
        lang("SUGGEST")(guildDB.language, { string: "EMBED_DESCRIPTION" })
      )
      .setAuthor({ name: user.displayName, iconURL: user.displayAvatarURL() })
      .setImage(interaction.client.user.displayAvatarURL());

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
  cooldown: Number,
  inRandomCommand: false,
};
