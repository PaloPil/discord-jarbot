const { SlashCommandBuilder } = require("discord.js");

const meows = [
  "Meow.",
  "Meow?",
  "mrowl",
  "mew",
  "Meow, meeeeow, mwowwww, meeeeeoww, mow.",
  "meow meow meow meow meow meow meow meow meow meow\nmeow meow meow meow meow meow meow meow\nmeow meow meow meow\nmeow meow",
  "purrrrr",
  "growl!!",
  "grrr",
  "mmmm.... purrr.... mmmm...",
  "purr.",
  "...",
  "mew? purrrrrrr.... mmm..",
  "hisssssss",
  "hyao!",
  "mewew",
  "Meow? Mew meeeow me meeeeoewowow mew meww meow.\nMew, meow mow meow meow.",
  "Me mew me meeeeooow me meow mew meeeowww purr moww meow me mew meoww, me mew meeowow me meeeeeoow mew meow purrr grrr meow. Meeow; meow, meow, grr meow. Mewowow mew, me meow mew meeeowww.\nMeoweeoow mew meow purrr grrr. Meows, meow moo mee meow.\nMeow me me me meooow.",
  "Meoww? meow. meow meow, meow meow meow.",
  "mew mew mew mew.",
  "prrrrr... snort.",
  "Myooooo.",
  "Meow meow meow meeeeow meow meow.\nMeow meow meow.\n",
  "purrr, purr, purrrrr...",
  "Miaule.",
  "Meowsterclass!",
];

module.exports = {
  data: new SlashCommandBuilder().setName("meow").setDescription("Meow."),
  async execute(interaction) {
    const max = meows.length;
    const random = Math.floor(Math.random() * max);
    const response = meows[random];

    await interaction.reply(response);
  },
  cooldown: 0,
  inRandomCommand: true,
};
