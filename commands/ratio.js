const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ratio")
    .setDescription("Ajoute les réactions RATIO à un message")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Identifiant ou lien du message.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Salon du message à RATIO")
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const message = interaction.options.getString("message");
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
      return interaction.editReply(
        "> **❌ Impossible de récupérer le message**.\n- **Vérifiez si l'ID ou l'URL est correcte.**\n- **Vérifiez dans les permissions que le bot puisse accéder au salon.**\n- **Si vous avez indiqué un identifiant d'un message qui ne se trouve pas dans le salon actuel vous devez obligatoirement indiquer le salon où il se situe.**"
      );
    }

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.SendMessages
      )
    ) {
      return interaction.editReply(
        "> **❌ Vous n'avez pas la permission d'envoyer des messages dans ce salon.**"
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
      return interaction.editReply(
        "> **❌ Vous n'avez pas la permission d'ajouter des réactions à ce message.**"
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
      return interaction.editReply(
        `> ❌ Le [membre](${targetMessage.url}) est déjà **RATIO** !`
      );
    } else {
      try {
        await Promise.all(toReact.map((emoji) => targetMessage.react(emoji)));

        return interaction.editReply(
          `> ✅ Le [membre](${targetMessage.url}) s'est fait **RATIO** !`
        );
      } catch (error) {
        return interaction.editReply(
          `> ❌ Le [membre](${targetMessage.url}) ne peut pas être **RATIO** !`
        );
      }
    }
  },
  cooldown: 10,
  inRandomCommand: false,
};
