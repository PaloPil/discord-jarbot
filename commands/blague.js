const { SlashCommandBuilder } = require("discord.js");
const BlaguesAPI = require("blagues-api");
const blagues = new BlaguesAPI(process.env.BLAGUETOKEN);

/* En réalité les types de blagues sont : 
    global, dev, dark, limit, beauf, blondes
   mais j'ai retiré ici les blagues limites (+18) et dark (humour noir) étant donnés leur nature.
*/

const typeBlagues = ["global", "dev", "beauf", "blondes"];
const excludedCategories = ["dark", "limit"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blague")
    .setDescription("Réponds par une blague !")
    .addStringOption((option) => {
      return option
        .setName("category")
        .setDescription("Type de blague")
        .setRequired(false)
        .addChoices(
          ...typeBlagues.map((type) => ({
            name: type.charAt(0).toUpperCase() + type.slice(1),
            value: type,
          }))
        );
    }),
  async execute(interaction) {
    const selectedType =
      interaction.options.getString("category") ?? typeBlagues.random();

    try {
      const category = blagues.categories[selectedType.toUpperCase()];
      if (!category) {
        throw new Error(`Catégorie de blague invalide : ${selectedType}`);
      }

      const joke = await fetchBlague(
        process.env.BLAGUETOKEN,
        category,
        excludedCategories
      );

      const embed = {
        title: `**Réponse :** \`${joke.answer}\``,
        description: `||${joke.joke}||`,
        color: 3066993,
        footer: {
          text: interaction.user.username,
          iconUrl: interaction.user.displayAvatarURL(),
        },
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching joke:", error);
      await interaction.reply(
        "Désolé, je n'ai pas pu trouver de blague pour le moment."
      );
    }
  },
  inRandomCommand: true,
};

async function fetchBlague(token, category, excludedCategories) {
  const url = `https://www.blagues-api.fr/api/type/${category}/random?disallow=${excludedCategories.join(
    ","
  )}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { headers });
  const data = await response.json();

  return data;
}
