const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const sharp = require("sharp");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");
const imageDownload = require("../utils/imageDownload.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beautify")
    .setNameLocalizations({
      fr: "embellir",
    })
    .setDescription("Make a profile picture more beautiful!")
    .setDescriptionLocalizations({
      fr: "Rend une photo de profil plus belle !",
    })
    .addUserOption((option) =>
      option
        .setName("user")
        .setNameLocalizations({
          fr: "utilisateur",
        })
        .setDescription("The user to beautify!")
        .setDescriptionLocalizations({
          fr: "L'utilisateur à embellir !",
        })
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("server-pfp")
        .setNameLocalizations({
          fr: "pp-serveur",
        })
        .setDescription(
          "Use user's server profile picture rather than profile one"
        )
        .setDescriptionLocalizations({
          fr: "Utiliser la photo de profil sur le serveur plutôt que celle du profil",
        })
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const user = interaction.options.getUser("user") ?? interaction.user;
    const serverpfp = interaction.options.getBoolean("server-pfp") ?? false;

    const guild = await Guild.findOne({ id: interaction.guild.id });

    if (user.id == interaction.client.user.id) {
      return interaction.editReply(
        lang("BEAUTIFY")(guild.language, { string: "TRY_ON_BOT" })
      );
    }

    const guildTarget = await interaction.guild.members.fetch(user);
    let avatarURL;

    serverpfp
      ? (avatarURL = guildTarget.displayAvatarURL({ size: 1024 }))
      : (avatarURL = user.displayAvatarURL({ size: 1024 }));

    const avatar = await imageDownload(avatarURL);

    const buffer = await sharp(avatar)
      .resize(600, 600, {
        fit: "cover",
        position: "center",
      })
      .composite([
        {
          input: "./assets/images/jar.png",
          gravity: "center",
          blend: "multiply",
        },
        {
          input: "./assets/images/jar.png",
          gravity: "center",
          blend: "dest-in",
        },
      ])
      .toBuffer();

    const file = new AttachmentBuilder(buffer, {
      name: `Jared_${interaction.user.id}.png`,
    });

    await interaction.editReply({
      content: "**Jared.**",
      files: [file],
    });
  },
  cooldown: 10,
  inRandomCommand: true,
};
