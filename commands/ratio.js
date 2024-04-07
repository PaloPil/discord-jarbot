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
        .setDescription("Salon du message à ratio")
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const message = interaction.options.getString("message");
    let channel =
      interaction.options.getChannel("channel") ?? interaction.channel;

    let messageId;

    if (message.startsWith("https://")) {
      messageId = message.split("/")[6];
    } else {
      messageId = message;
    }

    messageId = channel.messages.resolveId(messageId);

    let targetMessage;

    try {
      targetMessage = await channel.messages.fetch(messageId);
    } catch (error) {
      return interaction.editReply(
        "**❌ L'ID ou l'URL est incorrecte ou celui-ci ne se trouve pas dans le salon actuel (veuillez indiquez le salon dans ce cas).**"
      );
    }

    if (
      !channel
        .permissionsFor(interaction.user)
        .has(PermissionsBitField.Flags.SendMessages)
    ) {
      return interaction.editReply(
        "**❌ Vous n'avez pas la permission d'envoyer des messages dans ce salon.**"
      );
    }

    if (
      !targetMessage.channel
        .permissionsFor(interaction.user)
        .has(PermissionsBitField.Flags.SendMessages) &&
      !targetMessage.channel
        .permissionsFor(interaction.user)
        .has(PermissionsBitField.Flags.AddReactions)
    ) {
      return interaction.editReply(
        "**❌ Vous n'avez pas la permission d'ajouter des réactions à ce message.**"
      );
    }

    let reactions = [];

    let toReact = ["🇷", "🇦", "🇹", "🇮", "🇴"];

    await targetMessage.reactions.cache.forEach(async (reaction) => {
      const emojiName = reaction._emoji.name;
      await reactions.push(emojiName);
    });

    let allPresent = true;
    for (let i = 0; i < toReact.length; i++) {
      if (!reactions.includes(toReact[i])) {
        allPresent = false;
        break;
      }
    }

    if (allPresent) {
      return await interaction.editReply(
        `❌ Le [membre](${targetMessage.url}) est déjà **RATIO** !`
      );
    } else {
      try {
        await targetMessage.react("🇷");
        await targetMessage.react("🇦");
        await targetMessage.react("🇹");
        await targetMessage.react("🇮");
        await targetMessage.react("🇴");

        await interaction.editReply(
          `✅ Le [membre](${targetMessage.url}) s'est fait **RATIO** !`
        );
      } catch (error) {
        await interaction.editReply(
          `❌ Le [membre](${targetMessage.url}) ne peut pas être **RATIO** !`
        );
      }
    }
  },
  cooldown: 10,
  inRandomCommand: false,
};
