const { SlashCommandBuilder } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Donne le ping du bot")
    .setDescriptionLocalizations({
      "en-US": "Gives the bot's ping!",
    }),
  async execute(interaction) {
    interaction.deferReply();
    const guild = Guild.findOne({ id: interaction.guild.id });

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    const apiPing = Math.round(interaction.client.ws.ping);

    const embed = {
      title: "Pong!",
      description: `${lang("PING")(guild.language, {
        string: "EMBED_DESCRIPTION",
        ping: ping,
      })}\nAPI: ${apiPing}ms`,
      color: 12246104,
      footer: {
        text: interaction.user.username,
        iconUrl: interaction.user.displayAvatarURL(),
      },
    };

    interaction.editReply({ embeds: [embed] });
  },
  cooldown: 0,
  inRandomCommand: true,
};
