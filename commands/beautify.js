const { SlashCommandBuilder } = require("discord.js");
const Jimp = require("jimp");
const axios = require("axios");
const fs = require("fs").promises;
const fsbasic = require("fs");
const webp = require("webp-converter");

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
    try {
      const user = interaction.options.getUser("user") ?? interaction.user;
      const avatarURL = user.displayAvatarURL({ size: 2048 });

      const image = await getImageFromURL(avatarURL);

      const bocal = await Jimp.read("./images/anotherjar.png");

      image.resize(bocal.bitmap.width, bocal.bitmap.height);

      bocal.mask(image, 0, 0);

      const finalBuffer = await bocal.getBufferAsync(Jimp.MIME_PNG);
      const fileName = `jared_${interaction.user.id}.png`;

      await fs.writeFile(fileName, finalBuffer);

      await interaction.reply({
        content: "**Jared.**",
        files: [fileName],
      });

      await fs.unlink(fileName);
    } catch (error) {
      console.error(error);
      interaction.reply("Erreur lors de la modification de l'image.");
    } finally {
      await Promise.all([
        fs.unlink(__dirname + "/tmp.webp").catch(() => {}),
        fs.unlink(__dirname + "/tmp.png").catch(() => {}),
      ]);
    }
  },
  inRandomCommand: true,
};

async function getImageFromURL(imgUrl) {
  try {
    const response = await axios.get(imgUrl, { responseType: "stream" });
    const file = fsbasic.createWriteStream(__dirname + "/tmp.webp");
    response.data.pipe(file);

    return new Promise((resolve, reject) => {
      file.on("finish", async () => {
        try {
          await webp.dwebp(
            __dirname + "/tmp.webp",
            __dirname + "/tmp.png",
            "-o"
          );
          const img = await Jimp.read(__dirname + "/tmp.png");
          resolve(img);
        } catch (err) {
          reject(err);
        } finally {
          await fs.unlink(__dirname + "/tmp.webp").catch(() => {});
          await fs.unlink(__dirname + "/tmp.png").catch(() => {});
        }
      });

      file.on("error", reject);
    });
  } catch (error) {
    throw error;
  }
}
