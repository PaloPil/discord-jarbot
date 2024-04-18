# IMPORTANT : TRADUCTIONS

Commencez par importer cela au début :

```js
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");
```

À l'intérieur de la commande définissez le serveur (nommez la variable comme vous le souhaitez)

```js
const guild = await Guild.findOne({ id: interaction.guild.id });
```

Puis quand vous voulez répondre à un message mettez ceci (Remplacez `COMMAND` par le nom de la commande et `string` par le nom de la réponse) :

```js
lang("COMMAND")(guild.language, {
  string: "SUCCESS",
});
```

Dans le fichier de la langue correspondante, changez ensuite comme ceci :

```json
{
  "COMMANDS": [
    // Autres commandes...
    {
      "NAME": "COMMAND",
      "SUCCESS": "✅ **SUCCESS!**",
      "FAILED": "❌ **FAILED!**"
    }
  ]
}
```

Si la réponse contient des arguments à changer (par exemple le nom de l'utilisateur) faites comme ceci :

```js
lang("COMMAND")(guild.language, {
  string: "SUCCESS",
  user: interaction.user.tag,
  // Autres arguments ...
});
```

Puis dans la réponse mettez entre `{}` les arguments à changer

```json
"SUCCESS": "✅ **{user}, SUCCESS!**"
```