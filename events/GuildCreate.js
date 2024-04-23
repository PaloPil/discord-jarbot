const { Events } = require("discord.js");
const Guild = require("../utils/Guild");

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    try {
      const existingGuild = await Guild.findOne({ id: guild.id });

<<<<<<< HEAD
=======
      const ownerId = await guild.ownerId;

>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
      if (!existingGuild) {
        const newGuild = new Guild({
          id: guild.id,
          name: guild.name,
          language: "fr",
<<<<<<< HEAD
=======
          ownerId: ownerId,
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
        });

        await newGuild.save();
        console.log(
          `Nouveau serveur ajouté à la base de données : ${guild.name}`
        );
      } else {
<<<<<<< HEAD
        existingGuild.available = true;
=======
        existingGuild.name = guild.name;
        existingGuild.available = true;
        existingGuild.ownerId = ownerId;
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
        await existingGuild.save();
        console.log(`Serveur réintégré à la base de données : ${guild.name}`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout du serveur à la base de données :",
        error
      );
    }
  },
};
