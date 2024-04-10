const { Events } = require("discord.js");
const Guild = require("../utils/Guild");

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    try {
      const existingGuild = await Guild.findOne({ id: guild.id });

      if (!existingGuild) {
        const newGuild = new Guild({
          id: guild.id,
          name: guild.name,
          language: "fr",
        });

        await newGuild.save();
        console.log(
          `Nouveau serveur ajouté à la base de données : ${guild.name}`
        );
      } else {
        // Si la guilde existe déjà, vous pouvez la marquer comme disponible
        existingGuild.available = true;
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
