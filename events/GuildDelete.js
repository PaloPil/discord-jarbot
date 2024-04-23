const { Events } = require("discord.js");
const Guild = require("../utils/Guild");

module.exports = {
  name: Events.GuildDelete,
  async execute(guild) {
    try {
<<<<<<< HEAD
      const deletedGuild = await Guild.findOneAndUpdate(
=======
      await Guild.findOneAndUpdate(
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
        { id: guild.id },
        { available: false },
        { new: true }
      );

<<<<<<< HEAD
      console.log(`Serveur supprimé de la base de données : ${guild.name}`);
=======
      console.log(
        `Serveur supprimé de la base de données : ${guild.name} (${guild.id})`
      );
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du serveur dans la base de données :",
        error
      );
    }
  },
};
