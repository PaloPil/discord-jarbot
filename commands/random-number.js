const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("node:path");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

const command_name = path.basename(__filename).replace(".js", "");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-number")
    .setNameLocalizations({
      fr: "nombre-aléatoire",
    })
    .setDescription("Donne un nombre aléatoire entre 0 et 100")
    .setDescriptionLocalizations({
      "en-US": "Gives a random number between 0 and 100",
    })
    .addIntegerOption((option) =>
      option
        .setName("max")
        .setDescription("Le numéro maximum")
        .setDescriptionLocalizations({
          "en-US": "The max number",
        })
        .setRequired(false)
        .setMinValue(1)
    ),

  async execute(interaction) {
    const max = interaction.options.getInteger("max") || 100;
    const guild = await Guild.findOne({ id: interaction.guild.id });

    let num = 42; // The number to be returned

    num = num / 100;
    while (10 * num <= max) {
      num *= 10;
    }

    await interaction.reply(lang("RANDOM-NUMBER")(guild.language, {
      string: "RESPONSE",
      num: num
    }));
  },
  cooldown: 0,
  inRandomCommand: true,
};
