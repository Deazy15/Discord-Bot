// you only have to require Discord once,
// and you should use Object Destructuring since you'll be using `Client` and `Collection` mutliple times
const { Client, Collection } = require('discord.js');
// put all the modules at the top for improved readability
const fs = require('fs');
const config = require('./config.json'); // you used `config` in your code before declaring it which lead to an error, put it up here

// delete the lone client and only use the collection
const clients = new Collection([
  [
    'peter', // key
    {
      // value
      name: 'Peter',
      client: new Client(), // if you're gonna be setting the bots' presences in the ready event, you shouldn't do it here too
      commandPath: './firstCommands',
      prefix: '-',
      token: 'token1',
    },
  ],
  [
    'ayse', // second key
    {
      // second value
      name: 'Ayse',
      client: new Client(),
      commandPath: './secondCommands',
      prefix: '?',
      token: 'token2',
    },
  ],
]);

clients.forEach(({ client, commandPath, prefix, token, name }) => {
  client.commands = new Collection(); // remove the `map()` function and put it inside the `forEach()`
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`${commandPath}/${file}`);
    client.commands.set(command.name, command); // setting it in the collection
  }

  client.on('message', (message) => {
    // there's no reason to create a new loop, just continue with this one
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    // you should always return if a command isn't found
    // that way you won't be sent an error message every time you start a random message wit one of the prefixes
    if (!command) return;

    try {
      command.execute(message, args);
    } catch (err) {
      message.channel.send(`Das weiß ich leider nicht: ${err}`);
    }
  });
  client.login(token); // keep it all in one loop for efficiency and readbility
  client.once('ready', () => {
    console.log(`${name} ist bereit`);
    // use ternary
    config.activity.streaming
      ? // if this leads to an eslint error, copy this into your eslintrc rule object: "no-unused-expressions": ["error", { "allowTernary": true }]
        client.user.setPresence({
          activity: { name: config.activity.game, type: 'WATCHING' },
        })
      : client.user.setPresence({
          activity: {
            name: config.activity.game,
            type: 'STREAMING',
            url: 'https://twitch.tv/usrname',
          },
          status: 'idle', // note: the idle icon is overwritten by the STREAMING icon, so this won't do much
        });
  });
});

// remove a bunch of unneeded variables and modules

// these features should only be triggered by one client as not to spam the same message,
// so we'll just be executing them on the first client
// if you have a specific client you want to respond with, replace `clients.first()` with `clients.get('name')`
require('./welcome')(clients.first()); // execute the welcome function
// no need to make this a variable as you're only using it once
clients.first().on('message', async (msg) => {
  if (msg.author.bot || !msg.guild) return;

  var array = [
    'kommunist',
    'wichser',
    'wixxer',
    'wixer',
    'wichs',
    'wixx',
    'wix',
    'arschloch',
    'hurensohn',
    'hs',
    'kek',
    'simp',
    'lauch',
    'ausländer',
    'dreckssau',
    'missgeburt',
    'spast',
    'spaßt',
    'hund',
    'kreuzwichser',
    'fickfehler',
    'jude',
    'juden',
    'untermensch',
    'drecks',
    'dreck',
    'elendiger',
    'elender',
    'pic',
    'honk',
    'gay',
    'gae',
    'schwuchtel',
    'schwulette',
    'hund',
    'köpek',
    'gummihandschuh',
    'fick',
    'kobold',
    'nigger',
    'neger',
    'niger',
    'negger',
    'kot',
    'köter',
    'pizza hawaii',
    'hawaii',
    'lutsch lutsch',
    'lutsch',
    'blas',
    'lutsch mir',
    'fuck',
    'fuck you',
    'Feminist',
    'bitch',
    'spasti',
    'kürbiskopf',
    'vaginal',
    'vagina',
    'blöd',
    'dumm',
    'arschgefickt',
    'piss',
    'dick',
    'donald trump',
    'trump',
    'titte',
    'titten',
    'penis',
    'schlong',
    'penetration',
    'huan',
    'huansohn',
    'nigga',
    'pressack',
    'presssack',
  ];

  if (array.some((w) => msg.content.toLowerCase().includes(w))) {
    msg.delete();
    return msg.channel.send(
      `<@${msg.author.id}> ->->->**So nicht du Jude!**<-<-<-`
    );
  }
  const goodWords = [
    'kahba',
    'chaya',
    'adolf Hitler',
    'hitler',
    'adolf',
    'heil',
  ];
  const match = msg.content.replace(
    new RegExp(goodWords.join('|'), 'gi'),
    (word) => `**${word}**`
  );
  if (match !== msg.content)
    // if something changed
    msg.channel
      .send(`${match}\n\nGood Boy! :)`)
      .then((message) => message.delete({ timeout: 3000 }));
});
