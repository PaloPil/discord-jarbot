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
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const message = interaction.options.getString("message");
    const channel = interaction.options.getChannel("channel");

    let messageId;

    if (message.startsWith("https://")) {
      messageId = message.split("/")[6];
    } else {
      messageId = message;
    }

    try {
      messageId = channel.messages.resolveId(messageId);
    } catch (error) {
      return interaction.reply("**L'ID ou l'URL est incorrecte.**");
    }

    const targetMessage = await channel.messages.fetch(messageId);

    if (
      !channel
        .permissionsFor(interaction.user)
        .has(PermissionsBitField.Flags.SendMessages)
    ) {
      return interaction.editReply(
        "**Vous n'avez pas la permission d'envoyer des messages dans ce salon.**"
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
        "**Vous n'avez pas la permission d'ajouter des réactions à ce message.**"
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
      await targetMessage.react("🇷");
      await targetMessage.react("🇦");
      await targetMessage.react("🇹");
      await targetMessage.react("🇮");
      await targetMessage.react("🇴");

      await interaction.editReply(
        `✅ Le [membre](${targetMessage.url}) s'est fait **RATIO** !`
      );
    }
  },
  inRandomCommand: false,
};
