function lang(commandName) {
  const frData = require("../locales/fr.json");
  const enData = require("../locales/en.json");

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
