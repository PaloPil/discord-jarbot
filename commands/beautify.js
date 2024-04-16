const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const https = require("https");
const { v4: uuidv4 } = require("uuid");
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
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const user = interaction.options.getUser("user") ?? interaction.user;
    const guild = await Guild.findOne({ id: interaction.guild.id });

    if (user.id == interaction.client.user.id) {
      return interaction.editReply(
        lang("BEAUTIFY")(guild.language, { string: "TRY_ON_BOT" })
      );
    }

    const avatarURL = user.displayAvatarURL({ size: 1024 });
    const avatar = await imageDownload(avatarURL);

    const tempFilePath = path.join("./temp", `${uuidv4()}.png`);

    await sharp(avatar)
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
        }
      ])
      .greyscale()
      .toFile(tempFilePath);

    await interaction.editReply({
      content: "**Jared.**",
      files: [tempFilePath],
    });

    fs.unlink(tempFilePath, (err) => {
      if (err) console.error("Error deleting temporary file:", err);
    });
  },
  cooldown: 10,
  inRandomCommand: true,
};
