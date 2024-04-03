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
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const message = interaction.options.getString("message");

    let messageId;

    if (message.startsWith("https://")) {
      messageId = message.split("/")[6];
    } else {
      messageId = message;
    }

    try {
      messageId = interaction.channel.messages.resolveId(messageId);
    } catch (error) {
      return interaction.reply("**L'ID ou l'URL est incorrecte.**");
    }

    const targetMessage = await interaction.channel.messages.fetch(messageId);

    if (
      !interaction.channel
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

    await targetMessage.react("🇷");
    await targetMessage.react("🇦");
    await targetMessage.react("🇹");
    await targetMessage.react("🇮");
    await targetMessage.react("🇴");

    await interaction.editReply(
      `✅ Le [membre](${targetMessage.url}) s'est fait **RATIO** !`
    );
    console.log(targetMessage.channel.permissionsFor(interaction.user));
  },
};
