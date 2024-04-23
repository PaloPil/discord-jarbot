const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("free-nitro")
    .setNameLocalizations({
      fr: "nitro-gratuit",
    })
    .setDescription("Génère un code discord nitro gratuit !")
    .setDescriptionLocalizations({
      "en-US": "Generates a free discord nitro code!",
    }),
  async execute(interaction) {
    await interaction.deferReply();
    const guild = await Guild.findOne({ id: interaction.guild.id });

    const embed = new EmbedBuilder()
      .setColor("#e74c3c")
      .setTitle(
        lang("FREENITRO")(guild.language, {
          string: "EMBED_TITLE",
        })
      )
      .setDescription(
        lang("FREENITRO")(guild.language, {
          string: "EMBED_DESCRIPTION",
        })
      )
      .setFooter({
        text: lang("FREENITRO")(guild.language, {
          string: "EMBED_FOOTER",
        }),
      });

    await interaction.editReply({ embeds: [embed] });

    const waitTime = [1000, 1500, 2000, 2500, 3000, 4000];

    const loadingMessage = ["15%", "30%", "45%", "60%", "80%", "99%"];

    for (let i = 0; i < loadingMessage.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, waitTime[i]));
      embed.setDescription(
        lang("FREENITRO")(guild.language, {
          string: "EMBED_NEW_DESCRIPTION",
          loadingMessage: loadingMessage[i],
        })
      );
      await interaction.editReply({ embeds: [embed] });
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    embed
      .setTitle(
        lang("FREENITRO")(guild.language, {
          string: "EMBED_NEW_TITLE",
        })
      )
      .setDescription(
        lang("FREENITRO")(guild.language, {
          string: "EMBED_FINISHED",
        })
      )
      .setColor("#ff0000")
      .setFooter({
        text: lang("FREENITRO")(guild.language, {
          string: "EMBED_NEW_FOOTER",
        }),
      });
    await interaction.editReply({ embeds: [embed] });
  },
  cooldown: 10,
  inRandomCommand: true,
};
