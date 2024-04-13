const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ratio")
    .setDescription("Ajoute les réactions RATIO à un message")
    .setDescriptionLocalizations({
      "en-US": "Add the reactions RATIO to a message",
    })
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Identifiant ou lien du message.")
        .setDescriptionLocalizations({
          "en-US": "Message ID or link",
        })
        .setRequired(false)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setNameLocalizations({
          fr: "salon",
        })
        .setDescription("Salon du message à RATIO")
        .setDescriptionLocalizations({
          "en-US": "The message's channel",
        })
        .setRequired(false)
    ),
  async execute(interaction) {
    const guild = await Guild.findOne({ id: interaction.guild.id });

    const message = await interaction.options.getString("message");
    let channel =
      interaction.options.getChannel("channel") ?? interaction.channel;

    let messageId;
    let channelId;

    if (message.startsWith("https://")) {
      const urlParts = message.split("/");
      messageId = urlParts.pop();
      channelId = urlParts[5];
    } else {
      messageId = message;
    }

    let targetMessage;
    let targetChannel;

    try {
      if (channelId) {
        targetChannel = await interaction.guild.channels.fetch(channelId);
        targetMessage = await targetChannel.messages.fetch(messageId);
      } else {
        targetMessage = await channel.messages.fetch(messageId);
      }
    } catch (error) {
      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply(
        lang("RATIO")(guild.language, { string: "ERROR_CANNOT_FETCH_MESSAGE" })
      );
      return;
    }

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.SendMessages
      )
    ) {
      await interaction.deferReply({ ephemeral: true });
      return interaction.editReply(
        lang("RATIO")(guild.language, { string: "NO_CHANNEL_SEND_PERMISSION" })
      );
    }

    if (
      !targetMessage.channel
        .permissionsFor(interaction.member)
        .has(PermissionsBitField.Flags.SendMessages) ||
      !targetMessage.channel
        .permissionsFor(interaction.member)
        .has(PermissionsBitField.Flags.AddReactions)
    ) {
      await interaction.deferReply({ ephemeral: true });
      return interaction.editReply(
        lang("RATIO")(guild.language, { string: "NO_ADD_REACTIONS_PERMISSION" })
      );
    }

    let reactions = targetMessage.reactions.cache.map(
      (reaction) => reaction._emoji.name
    );

    let allPresent = true;
    const toReact = ["🇷", "🇦", "🇹", "🇮", "🇴"];

    for (const emoji of toReact) {
      if (!reactions.includes(emoji)) {
        allPresent = false;
        break;
      }
    }

    if (allPresent) {
      await interaction.deferReply({ ephemeral: true });
      return interaction.editReply(
        lang("RATIO")(guild.language, {
          string: "USER_ALREADY_RATIO",
          targetMessage: targetMessage.url,
        })
      );
    } else {
      try {
        await Promise.all(toReact.map((emoji) => targetMessage.react(emoji)));
        await interaction.deferReply();
        return interaction.channel.send(
          lang("RATIO")(guild.language, {
            string: "USER_SUCCESS_RATIO",
            targetMessage: targetMessage.url,
          })
        );
      } catch (error) {
        await interaction.deferReply({ ephemeral: true });
        return interaction.editReply(
          lang("RATIO")(guild.language, {
            string: "USER_CANNOT_BE_RATIO",
            targetMessage: targetMessage.url,
          })
        );
      }
    }
  },
  cooldown: 10,
  inRandomCommand: false,
};
