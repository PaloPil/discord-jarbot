const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rephrase")
    .setNameLocalizations({
        "fr": "reformuler",
    })
    .setDescription("[AI POWERED] Rephrase a sentence using AI!")
    .setDescriptionLocalizations({
      "fr": "[AI POWERED] Reformuler une phrase en utilisant l'IA !",
    }),

  async execute(interaction) {
    const guild = await Guild.findOne({ id: interaction.guild.id });

    const popup = new ModalBuilder()
	    .setCustomId('rephrase')
		.setTitle(lang("REPHRASE")(guild.language, {
            string: "POPUP_TITLE",
        }));
    
    const input = new TextInputBuilder()
        .setCustomId('input')
        .setLabel(lang("REPHRASE")(guild.language, {
            string: "INPUT_LABEL",
        }))
        .setPlaceholder(lang("REPHRASE")(guild.language, {
            string: "INPUT_PLACEHOLDER",
        }))
        .setStyle(TextInputStyle.Paragraph)
        .setValue("");
    
    const actionRow = new ActionRowBuilder().addComponents(input);

    popup.addComponents(actionRow);

    await interaction.showModal(popup);
  },
  async executeModal(interaction) {

    const input = interaction.fields.getTextInputValue("input");

    let rephrased = "";
    for (let i = 0; i < input.length; i++) {
        rephrased = input[i] + rephrased;
    }
    
    if (rephrased.length > 500) {
        await interaction.reply({
            content: "\`\`\`\n"+rephrased+"\n\`\`\`",
            ephemeral: true,
        });
    } else {
        await interaction.reply({
            content: "\`\`\`\n"+rephrased+"\n\`\`\`",
            ephemeral: false,
        });
    }
    return;
  },
  inRandomCommand: true,
  cooldown: 15,
};