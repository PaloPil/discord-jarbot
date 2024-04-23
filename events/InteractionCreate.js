const { Events, Collection } = require("discord.js");
const Guild = require("../utils/Guild");
const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {

    if (interaction.isModalSubmit()) {

      const commandsPath = path.join(__dirname, "/../commands");
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js") && file.replace(".js", "") === interaction.customId);
      if (commandFiles.length === 0) {
        console.error(`No modal matching ${interaction.customId} was found.`);
        return;
      } else {
        const filePath = path.join(commandsPath, commandFiles[0]);
        const command = require(filePath);
        if ("executeModal" in command) {
          try {
            await command.executeModal(interaction);
          } catch (error) {
            console.error(`Error executing modal ${interaction.customId}`);
            console.error(error);
          }
        }
      };
      return;
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    const { cooldowns } = interaction.client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 5;
    const cooldownAmount =
      (command.cooldown ?? defaultCooldownDuration) * 1_000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1_000);
        return interaction.reply({
          content: `Une petite pause s'impose 😔 *(Attend avant de réutiliser : <t:${expiredTimestamp}:R>)*`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    let guild = await interaction.guild;
    let ownerId = await guild.ownerId;

    if (command.needRefresh) {
      await Guild.findOneAndUpdate(
        { id: guild.id },
        {
          name: guild.name,
          available: true,
          ownerId: ownerId,
        },
        { new: true, upsert: true }
      );
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
