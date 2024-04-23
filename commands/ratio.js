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
        .setRequired(true)
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

    const immuneUsers = interaction.client.immuneUsers;
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

    /* This part is attempting to fetch the message based on the provided message ID and channel ID.*/
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
        `${lang("RATIO")(guild.language, {
          string: "ERROR_CANNOT_FETCH_MESSAGE_EMBED_TITLE",
        })}
        \n
        ${await lang("RATIO")(guild.language, {
          string: "ERROR_CANNOT_FETCH_MESSAGE_EMBED_DESCRIPTION",
        })}`
      );
      return;
    }

    /* This part is checking the permissions of the user interacting with the bot and the
       permissions required to send messages and add reactions to the target message. */
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.SendMessages
      )
    ) {
      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply(
        lang("RATIO")(guild.language, { string: "NO_CHANNEL_SEND_PERMISSION" })
      );
      return;
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
      await interaction.editReply(
        lang("RATIO")(guild.language, { string: "NO_ADD_REACTIONS_PERMISSION" })
      );
      return;
    }

    /* This part is checking if the user interacting with the bot is included in the
`immuneUsers` array. If the user is found in the `immuneUsers` array. Immune users cannot be RATIO*/
    // if (immuneUsers.includes(interaction.user.id.toString())) {
    //   await interaction.deferReply({ ephemeral: true });
    //   await interaction.editReply(
    //     lang("RATIO")(guild.language, {
    //       string: "USER_IMMUNE_RATIO",
    //       targetMessage: targetMessage.url,
    //     })
    //   );
    //   return;
    // }

    /* This part is checking if the reactions RATIO are already present
on the `targetMessage`. */
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

    const response = await lang("RATIO")(guild.language, {
      string: allPresent ? "USER_ALREADY_RATIO" : "USER_SUCCESS_RATIO",
      targetMessage: targetMessage.url,
    });

    toReact.map((emoji) => targetMessage.react(emoji));

    await interaction.reply({
      content: response,
      ephemeral: allPresent,
    });
  },
  cooldown: 10,
  inRandomCommand: false,
};
