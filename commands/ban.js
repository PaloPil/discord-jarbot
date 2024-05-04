const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

// Fake ban

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server!")
    .setDescriptionLocalizations({
      fr: "Bannir un utilisateur du serveur !",
    })
    .addUserOption((option) =>
      option
        .setName("target")
        .setNameLocalizations({
          fr: "cible",
        })
        .setDescription("The user to ban!")
        .setDescriptionLocalizations({
          fr: "L'utilisateur à bannir !",
        })
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setNameLocalizations({
          fr: "raison",
        })
        .setDescription("The reason of the ban!")
        .setDescriptionLocalizations({
          fr: "La raison du ban !",
        })
        .setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const guild = await Guild.findOne({ id: interaction.guild.id });

    const target = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") ??
      lang("FAKEBAN")(guild.language, {
        string: "DEFAULT_REASON",
      });

    const embed = new EmbedBuilder()
      .setTitle(
        lang("FAKEBAN")(guild.language, {
          string: "BAN_MESSAGE",
          username: target.tag,
        })
      )
      .setDescription(`*${reason}*`)
      .setImage("https://media1.tenor.com/m/Kt1irdU_daUAAAAC/ban-admin.gif")
      .setFooter({
        text: lang("FAKEBAN")(guild.language, {
          string: "BANNED_BY",
          executor: interaction.user.tag,
        }),
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .setColor("#FF0000");

    await interaction.reply({
      content: `<@${target.id}>`,
      embeds: [embed],
      ephemeral: false,
    });

    // Send a message in the same channel to explain the joke and delete it after 3 seconds if it is the 1st of April
    if (new Date().getDate() === 1 && new Date().getMonth() === 3) {
      const jokeMessage = await interaction.followUp({
        content: `||:fish:||`,
        ephemeral: false,
      });

      setTimeout(async () => {
        await jokeMessage.delete();
      }, 3 * 1000);
    }
  },
};
