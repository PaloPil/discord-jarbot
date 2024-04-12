const { SlashCommandBuilder } = require("@discordjs/builders");
const path = require("node:path");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

const command_name = path.basename(__filename).replace(".js", "");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(command_name)
    .setNameLocalizations({
      fr: "somme",
    })
    .setDescription("Permet d'obtenir la somme de deux nombres.")
    .setDescriptionLocalizations({
      "en-US": "Get the sum of two numbers.",
    })
    .addIntegerOption((option) =>
      option
        .setName("a")
        .setDescription("Premier nombre à additionner.")
        .setDescriptionLocalizations({
          "en-US": "First number",
        })
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("b")
        .setDescription("Deuxième nombre à additionner.")
        .setDescriptionLocalizations({
          "en-US": "Second Number",
        })
        .setRequired(true)
    ),

  async execute(interaction) {
    const guild = await Guild.findOne({ id: interaction.guild.id });
    const reponses = lang("SUM")(guild.language, { string: "RESPONSES" });

    const n1 = interaction.options.getInteger("a");
    const n2 = interaction.options.getInteger("b");

    await interaction.reply(
      `\`${n1}\` ${n2 >= 0 ? "+" : "-"} \`${
        n2 > 0 ? n2 : -n2
      }\` = \`${Array.from(reponses).random()}\``
    );
  },
  cooldown: 0,
  inRandomCommand: false,
};
