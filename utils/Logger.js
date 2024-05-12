class Logger {
  static async log(isCommand, interaction, content, type = "log") {
    const date = new Date(Date.now());
    const timestamp = `\`${date.toLocaleDateString(
      "fr-FR"
    )} - ${date.toLocaleTimeString("fr-FR")}\``;
    const guildId = "1226328890717507658";
    const channelId = "1226334984671985676";

    const client = interaction.client;

    const guild = await client.guilds.cache.get(guildId);
    if (!guild) return console.error(`Guild with ID ${guildId} not found`);

    const channel = await guild.channels.cache.get(channelId);
    if (!channel)
      return console.error(
        `Channel with ID ${channelId} not found in guild ${guild.name}`
      );

    const embed = {
      title: "Une erreur est parvenu !",
      color: 15275270,
      fields: [
        {
          name: "Utilisateur",
          value: `\`${interaction.user.tag} (${interaction.user.id})\``,
          inline: true,
        },
        {
          name: "Serveur",
          value: `\`${interaction.guild.name} (${interaction.guild.id})\``,
          inline: true,
        },
        {
          name: "Date",
          value: timestamp,
          inline: true,
        },
        isCommand
          ? {
              name: "Commande",
              value: `\`${interaction.commandName}\``,
              inline: true,
            }
          : { name: "\u200b", value: "\u200b", inline: false },
        {
          name: "Erreur",
          value: `\`\`\`\n${content}\n\`\`\``,
        },
      ],
    };

    switch (type) {
      case "log": {
        return channel.send(`${timestamp} [LOG] ${content}`);
      }
      case "warn": {
        return channel.send(`${timestamp} [WARN] ${content}`);
      }
      case "error": {
        return channel.send({
          content: "<@&1232771262846079079>",
          embeds: [embed],
        });
      }
      case "debug": {
        return channel.send(`${timestamp} [DEBUG] ${content}`);
      }
      default:
        throw new TypeError(
          "Le type de logger doit être warn, debug, log ou error."
        );
    }
  }

  static async error(isCommand, client, content) {
    return this.log(isCommand, client, content, "error");
  }

  static async warn(client, content) {
    return this.log(client, content, "warn");
  }

  static async debug(client, content) {
    return this.log(client, content, "debug");
  }
}

module.exports = Logger;
