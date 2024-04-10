const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setPresence({
      activities: [{ name: "Just A Random Bot", type: ActivityType.PLAYING }],
      status: "idle",
    });
  },
};
