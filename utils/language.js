/**
 * The function `lang` is a language localization function that retrieves and formats strings based on
 * the specified language and arguments.
 * @param {string} stringName - The `stringName` parameter in the `lang` function represents the name of the
 * string or command you want to retrieve the translation for. It is used to look up the specific
 * string or command in the language data based on the provided language and arguments.
 * @param {boolean} global - The `global` parameter in the `lang` function is a boolean flag that determines
 * whether you want to retrieve global strings or command-specific strings. If `global` is set to
 * `true`, the function will look for the string in the `GLOBALS` array of language data. If `global`
 * @returns {Function} The `lang` function returns a function based on the value of the `global` parameter. If
 * `global` is true, it returns a function that looks for a specific string in the global data based on
 * the provided language and arguments. If `global` is false, it returns a function that looks for a
 * specific string in the commands data based on the provided language and arguments.
 */
function lang(stringName, global) {
  const frData = require("../langs/fr.json");
  const enData = require("../langs/en.json");

  return global
    ? /**
       * This function gets the language specified arguments and replace all specified arguments.
       * @param {string} language - The `language` parameter in this function represents the language to use.
       * @param {} args - Represents all the arguments to replace by.
       * @returns {string} - Returns the string of the language's respective JSON, with if specified, the modified strings.
       */
      function (language, args) {
        let langData;
        switch (language) {
          case "fr":
            langData = frData;
            break;
          case "en":
            langData = enData;
            break;
          default:
            langData = enData;
            break;
        }

        const command = langData.GLOBALS.find((cmd) => cmd.NAME === stringName);

        if (!command) {
          console.error(
            `La commande ${stringName} n'a pas été trouvée dans les langues`
          );
          return null;
        }

        const string = args.string;
        delete args.string;

        let locale = command[string];

        if (!locale) {
          console.error(
            `La mot clé ${string} n'a pas été trouvée dans la commande ${stringName}.`
          );
          return null;
        }

        for (const [key, value] of Object.entries(args)) {
          const varPlaceholder = `{${key}}`;
          locale = locale.replace(new RegExp(varPlaceholder, "g"), value);
        }

        return locale;
      }
    : /**
       * This function gets the language specified arguments and replace all specified arguments.
       * @param {string} language - The `language` parameter in this function represents the language to use.
       * @param {} args - Represents all the arguments to replace by.
       * @returns {string} - Returns the string of the language's respective JSON, with if specified, the modified strings.
       */
      function (language, args) {
        let langData;
        switch (language) {
          case "fr":
            langData = frData;
            break;
          case "en":
            langData = enData;
            break;
          default:
            langData = enData;
            break;
        }

        const command = langData.COMMANDS.find(
          (cmd) => cmd.NAME === stringName
        );

        if (!command) {
          console.error(
            `La commande ${stringName} n'a pas été trouvée dans les langues`
          );
          return null;
        }

        const string = args.string;
        delete args.string;

        let locale = command[string];

        if (!locale) {
          console.error(
            `La mot clé ${string} n'a pas été trouvée dans la commande ${stringName}.`
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
