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
    .setName("beautify")
    .setNameLocalizations({
      fr: "embellir",
    })
    .setDescription("Rend une photo de profil plus belle !")
    .setDescriptionLocalizations({
      "en-US": "Make a profile picture more beautiful!",
    })
    .addUserOption((option) =>
      option
        .setName("user")
        .setNameLocalizations({
          fr: "utilisateur",
        })
        .setDescription("L'utilisateur à embellir !")
        .setDescriptionLocalizations({
          "en-US": "The user to beautify!",
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

    const user = interaction.options.getUser("user") ?? interaction.user;
    const serverpfp = interaction.options.getBoolean("server-pfp");

    const guild = await Guild.findOne({ id: interaction.guild.id });

    if (user.id == interaction.client.user.id) {
      return interaction.editReply(
        lang("BEAUTIFY")(guild.language, { string: "TRY_ON_BOT" })
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
      .resize(600, 600, {
        fit: "cover",
        position: "center",
      })
      .composite([
        {
          input: "./images/anotherjar.png",
          gravity: "center",
          blend: "multiply",
        },
        {
          input: "./images/anotherjar.png",
          gravity: "center",
          blend: "dest-in",
        },
      ])
      .greyscale()
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
