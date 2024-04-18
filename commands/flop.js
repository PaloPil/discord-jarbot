const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const sharp = require("sharp");
const https = require("https");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

const imageDownload = (url) => {
  if (!(url && /^https?:\/\/[^ ]+$/.test(url)))
    throw new TypeError("A valid url is required");

  return new Promise((resolve) => {
    https.get(url, (response) => {
      let data = Buffer.from([], "binary");

      response.on("data", (chunk) => {
        const buffer = Buffer.from(chunk, "binary");
        const length = data.length + buffer.length;

        data = Buffer.concat([data, buffer], length);
      });

      response.on("end", () => {
        resolve(data);
      });
    });
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flop")
    .setDescription("Donne une certification de FLOP")
    .setDescriptionLocalizations({
      "en-US": "Provides FLOP certification",
    })
    .addUserOption((option) =>
      option
        .setName("user")
        .setNameLocalizations({
          fr: "utilisateur",
        })
        .setDescription("L'utilisateur qui a FLOP")
        .setDescriptionLocalizations({
          "en-US": "The used that FLOP",
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
          "Utiliser la photo de profil sur le serveur plutôt que celle du profil"
        )
        .setDescriptionLocalizations({
          "en-US": "Use user's server profile picture rather than profile one",
        })
        .setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const guild = await Guild.findOne({ id: interaction.guild.id });

    const user =
      (await interaction.options.getUser("user")) ?? interaction.user;
    const serverpfp = interaction.options.getBoolean("server-pfp");

    if (user.id == interaction.client.user.id) {
      return interaction.editReply(
        lang("FLOP")(guild.language, { string: "THE_JAR_CANT_FLOP" })
      );
    }

    const guildTarget = await interaction.guild.members.fetch(user);

    let avatarURL;

    if (serverpfp) {
      avatarURL = guildTarget.displayAvatarURL({ size: 2048 });
    } else {
      avatarURL = user.displayAvatarURL({ size: 2048 });
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
          input: "./images/FLOP.png",
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
