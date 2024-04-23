const { Events } = require("discord.js");
const Guild = require("../utils/Guild");

module.exports = {
  name: Events.GuildDelete,
  async execute(guild) {
    try {
      await Guild.findOneAndUpdate(
        { id: guild.id },
        { available: false },
        { new: true }
      );

      console.log(
        `Serveur supprimé de la base de données : ${guild.name} (${guild.id})`
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du serveur dans la base de données :",
        error
      );
    }
  },
};
