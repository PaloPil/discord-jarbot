const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

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
      const THECATAPI_URL = "https://api.thecatapi.com/v1/images/search";
      const max = meows.length;
      const random = Math.floor(Math.random() * max);
      const response = meows[random];

      const fetched = await fetch(THECATAPI_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.CATAPI,
        },
        redirect: "follow",
        params: {
          size: "med",
          mime_types: "jpg",
          format: "json",
          has_breeds: true,
          order: "RANDOM",
          page: 0,
          limit: 1,
          tag: "playful",
        },
      });

      let data;
      let imageUrl;

      try {
        data = await fetched.json();
        imageUrl = data[0].url;
      } catch (e) {
        console.log;
      }
      const embed = new EmbedBuilder()
        .setTitle("Meow!")
        .setColor("#" + Math.floor(Math.random() * 16777215).toString(16))
        .setImage(imageUrl);

      await interaction.reply(
        fetched.ok
          ? {
              content: response,
              embeds: [embed],
            }
          : { content: response }
      );
      this.cooldown = 7;
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
