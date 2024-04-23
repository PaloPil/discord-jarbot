# IMPORTANT: TRANSLATIONS

Start by importing this at the start :

```js
const Guild = require("../utils/Guild.js");
const lang = require("../utils/language.js");
```

Then inside the command define the guild (name it as you want)

```js
const guild = await Guild.findOne({ id: interaction.guild.id });
```

Then when you need to reply to a message do it like this (Replace `COMMAND` by the command name and the `string` by the name of the response):

```js
lang("COMMAND")(guild.language, {
  string: "SUCCESS",
});
```

Then in the specific language file change like this:

```json
{
  "COMMANDS": [
    // Other commands ...
    {
      "NAME": "COMMAND",
      "SUCCESS": "✅ **SUCCESS!**",
      "FAILED": "❌ **FAILED!**"
    }
  ]
}
```

If the reply contains some arguments to change (the username, for example) do like this:

```js
lang("COMMAND")(guild.language, {
  string: "SUCCESS",
  user: interaction.user.tag,
  // Other arguments ...
});
```

Then in the answer, put the arguments to be changed between `{}`.

```json
"SUCCESS": "✅ **{user}, SUCCESS!**"
```