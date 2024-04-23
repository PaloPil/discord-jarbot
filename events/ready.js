const { Events, ActivityType } = require("discord.js");
const Guild = require("../utils/Guild");

module.exports = {
  name: Events.ClientReady,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
      activities: [{ name: "Just A Random Bot", type: ActivityType.PLAYING }],
      status: "online",
    });

    const guilds = await client.guilds.fetch();

    for (const guild of guilds.values()) {
      try {
        const existingGuild = await Guild.findOne({ id: guild.id });

        if (!existingGuild) {
          const newGuild = new Guild({
            name: guild.name,
            id: guild.id,
            language: "fr",
            available: true,
            ownerId: guild.ownerId,
          });

          await newGuild.save();
          console.log(`Added new server: ${guild.name} (${guild.id})`);
        }
      } catch (error) {
        console.error(
          `Error adding server ${guild.name} (${guild.id}) to database:`,
          error
        );
      }
    }
  },
};
