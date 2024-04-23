const { SlashCommandBuilder } = require("discord.js");

const meows = [
  "Meow.",
  "Meow?",
<<<<<<< HEAD
  "mrowl",
  "mew",
  "Meow, meeeeow, mwowwww, meeeeeoww, mow.",
  "meow meow meow meow meow meow meow meow meow meow\nmeow meow meow meow meow meow meow meow\nmeow meow meow meow\nmeow meow",
=======
  "mew",
  "Meow, meeeeow, mwowwww, meeeeeoww, mow.",
  "meow meow meow meow meow meow meow meow meow meow meow meow meow",
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
  "purrrrr",
  "growl!!",
  "grrr",
  "mmmm.... purrr.... mmmm...",
  "purr.",
<<<<<<< HEAD
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
=======
  "mew? purrrrrrr.... mmm..",
  "hisssssss",
  "Mewew",
  "Meow? Mew meeeow me meeeeoewowow meww meow. Mew, meow mow meow meow.",
  "Me mew me meeeeooow me meow mew meeeowww purr",
  "Meoww? meow. meow meow, meow meow meow.",
  "Mew mew mew mew.",
  "Prrrrr....",
  "Myooooo.",
  "Meow meow meow meeeeow meow meow. Meow meow meow.",
  "Purrr, purr, purrrrr...",
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
  "Miaule.",
  "Meowsterclass!",
];

module.exports = {
<<<<<<< HEAD
  data: new SlashCommandBuilder().setName("meow").setDescription("Meow."),
  async execute(interaction) {
    const max = meows.length;
    const random = Math.floor(Math.random() * max);
    const response = meows[random];

    await interaction.reply(response);
=======
  data: new SlashCommandBuilder()
    .setName("meow")
    .setDescription("Meow.")
    .addStringOption((option) => {
      return option
        .setName("meow")
        .setDescription("Meow Meow ?")
        .setRequired(false)
        .setMinLength(1)
        .setMaxLength(240);
    }),
  async execute(interaction) {
    const meow = interaction.options.getString("meow");
    if (meow === null) {
      const max = meows.length;
      const random = Math.floor(Math.random() * max);
      const response = meows[random];

      await interaction.reply(response);
    } else {
      let meowifiedMessage = "";

      if (meow.length > 0 && /^[a-zA-Z]+$/.test(meow) && meow.length >= 10) {
        meowifiedMessage = "meoooooooooooow!!";
      } else {
        const words = meow.split(" ");
        if (words.length > 1) {
          const mewCount = Math.min(words.length - 1, 10);
          meowifiedMessage = "Meow " + "mew ".repeat(mewCount) + "meow";
        } else {
          meowifiedMessage = "Meow";
        }
      }

      await interaction.reply(meowifiedMessage);
    }
>>>>>>> 1a598450aa6e82820f9c8b67b9006314b1d8cc00
  },
  cooldown: 0,
  inRandomCommand: true,
};
