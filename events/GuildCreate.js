const { Events } = require("discord.js");
const Guild = require("../utils/Guild");

module.exports = {
  name: Events.GuildCreate,
  async execute(guild) {
    try {
      const existingGuild = await Guild.findOne({ id: guild.id });

      const ownerId = await guild.ownerId;

      if (!existingGuild) {
        const newGuild = new Guild({
          id: guild.id,
          name: guild.name,
          language: "fr",
          ownerId: ownerId,
        });

        await newGuild.save();
        console.log(
          `Nouveau serveur ajouté à la base de données : ${guild.name}`
        );
      } else {
        existingGuild.name = guild.name;
        existingGuild.available = true;
        existingGuild.ownerId = ownerId;
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
