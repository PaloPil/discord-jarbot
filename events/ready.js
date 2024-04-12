const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [{ name: "Just A Random Bot", type: ActivityType.PLAYING }],
      status: "online",
    });
    console.log(`Client connected as ${client.user.tag}!`);
  },
};
