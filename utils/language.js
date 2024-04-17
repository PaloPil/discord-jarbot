/**
 * The function `lang` retrieves and formats language-specific data for a given command name and
 * language.
 * @param commandName - The `commandName` parameter in the `lang` function is used to specify the name
 * of the command for which you want to retrieve the language data.
 * @returns A function that takes a language and arguments as parameters, looks up the corresponding
 * command in the language data based on the command name provided, replaces placeholders in the
 * command string with the provided arguments, and returns the localized command string.
 */
function lang(commandName) {
  const frData = require("../langs/fr.json");
  const enData = require("../langs/en.json");

  return function (language, args) {
    const langData = language === "fr" ? frData : enData;

    const command = langData.COMMANDS.find((cmd) => cmd.NAME === commandName);

    if (!command) {
      console.error(
        `La commande ${commandName} n'a pas été trouvée dans les langues`
      );
      return null;
    }

    const string = args.string;
    delete args.string;

    let locale = command[string];

    if (!locale) {
      console.error(
        `La mot clé ${string} n'a pas été trouvée dans la commande ${commandName}.`
      );
      return null;
    }

    for (const [key, value] of Object.entries(args)) {
      const varPlaceholder = `{${key}}`;
      locale = locale.replace(new RegExp(varPlaceholder, "g"), value);
    }

    return locale;
  };
}

module.exports = lang;
