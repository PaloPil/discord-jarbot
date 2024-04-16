const { SlashCommandBuilder } = require("discord.js");

const meows = [
  "Meow.",
  "Meow?",
  "mew",
  "Meow, meeeeow, mwowwww, meeeeeoww, mow.",
  "meow meow meow meow meow meow meow meow meow meow meow meow meow",
  "purrrrr",
  "growl!!",
  "grrr",
  "mmmm.... purrr.... mmmm...",
  "purr.",
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
  "Miaule.",
  "Meowsterclass!",
];

module.exports = {
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
  },
  cooldown: 0,
  inRandomCommand: true,
};

function meowify(message) {
  message = message.toLowerCase();

  message = message.replace(" ", " meow ");

  for (let i = 0; i < message.length; i++) {
    if (message[i] === " ") {
      continue;
    }
    message = message.replace(message[i], "meow" + message[i]);
  }
  return message;
}
