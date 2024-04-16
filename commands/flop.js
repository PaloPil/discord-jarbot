const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const https = require("https");
const { v4: uuidv4 } = require("uuid");

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
        .setName("utilisateur")
        .setNameLocalizations({
          "en-US": "user",
        })
        .setDescription("L'utilisateur qui a FLOP")
        .setDescriptionLocalizations({
          "en-US": "The used that FLOP",
        })
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const user = await interaction.options.getUser("utilisateur") ?? interaction.user;
    const avatarURL = user.displayAvatarURL({ size: 1024 });
    const avatar = await imageDownload(avatarURL);

    const tempFilePath = path.join("./temp", `${uuidv4()}.png`);

    await sharp(avatar)
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
      .toFile(tempFilePath)

      await interaction.editReply({
        content: "**FLOP.**",
        files: [tempFilePath],
      });

      fs.unlink(tempFilePath, (err) => {
        if (err) console.error("Error deleting temporary file:", err);
      });

  },
  cooldown: 15,
  inRandomCommand: true,
};
