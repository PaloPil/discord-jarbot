const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const sharp = require("sharp");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");
const imageDownload = require("../utils/imageDownload.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flop")
    .setDescription("Provides FLOP certification")
    .setDescriptionLocalizations({
      fr: "Donne une certification de FLOP",
    })
    .addUserOption((option) =>
      option
        .setName("user")
        .setNameLocalizations({
          fr: "utilisateur",
        })
        .setDescription("The used that FLOPed")
        .setDescriptionLocalizations({
          fr: "L'utilisateur qui a FLOP",
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

    const guild = await Guild.findOne({ id: interaction.guild.id });

    const user = (await interaction.options.getUser("user")) ?? interaction.user;

    console.log(user);
    const serverpfp = interaction.options.getBoolean("server-pfp") ?? false;

    if (user.id == interaction.client.user.id) {
      return interaction.editReply(
        lang("FLOP")(guild.language, { string: "THE_JAR_CANT_FLOP" })
      );
    }

    let avatarURL;

    if (serverpfp && interaction.guild.members.cache.has(user.id)) {
        const guildTarget = await interaction.guild.members.fetch(user);
        avatarURL = guildTarget.displayAvatarURL({ size: 1024 })
    } else {
        avatarURL = user.displayAvatarURL({ size: 1024 });
    }

    const avatar = await imageDownload(avatarURL);

    const buffer = await sharp(avatar)
      .resize(1024, 1024, {
        fit: "cover",
        position: "center",
      })
      .greyscale()
      .composite([
        {
          input: "./assets/images/FLOP.png",
          gravity: "center",
        },
      ])
      .toBuffer();

    const file = new AttachmentBuilder(buffer, {
      name: `FLOP_${interaction.user.id}.png`,
    });

    await interaction.editReply({
      content: "**FLOP.**",
      files: [file],
    });
  },
  cooldown: 15,
  inRandomCommand: true,
};
