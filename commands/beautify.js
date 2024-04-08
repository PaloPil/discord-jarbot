const { SlashCommandBuilder } = require("discord.js");
const Jimp = require("jimp");
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
    .setName("beautify")
    .setDescription("Rend une photo de profil plus belle !")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("L'utilisateur à embellir !")
        .setRequired(false)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const user = interaction.options.getUser("user") ?? interaction.user;
    const avatarURL = user.displayAvatarURL({ size: 2048 });

    const buffer = await imageDownload(avatarURL);

    const imageBuffer = await sharp(buffer).png().toBuffer();

    const image = await Jimp.read(imageBuffer);
    const jar = await Jimp.read("./images/anotherjar.png");

    image.resize(jar.bitmap.width, jar.bitmap.height);
    jar.mask(image, 0, 0);

    const finalBuffer = await jar.getBufferAsync(Jimp.MIME_PNG);

    const tempFilePath = path.join("./temp", `${uuidv4()}.png`);
    await fs.promises.writeFile(tempFilePath, finalBuffer);

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
