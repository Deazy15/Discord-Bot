const Discord = require('discord.js');

const client = new Discord.Client();


const clients = new Discord.Collection([

  [
    "peter", // key
    { // value
      name: "Peter",
      client: new Discord.Client({
        presence: {
          status: "online",
          activity: {
            type: "WATCHING",
            name: "something on tv", 
          },
        },
      }),
      commandPath: "./firstCommands",
      prefix: "-",
      token: 'token1',
    },
  ],
  [
  "ayse", // second key
  { // second value
    name: 'Ayse',
    client: new Discord.Client(),
    commandPath: './secondCommands',
    prefix: '?',
    token: 'token2', 
  }
] 
]);

const { Collection, Client } = require("discord.js");
const fs = require("fs");

clients.forEach(({ client, commandPath, prefix, token, name}) => {
  client.commands = new Collection(); // remove the `map()` function and put it inside the `forEach()`
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`${commandPath}/${file}`);
    client.commands.set(command.name, command); // setting it in the collection
  }

    client.on("message", (message) => {
    // there's no reason to create a new loop, just continue with this one
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try {
         client.commands.get(command).execute(message);
    } 
    catch(err) {
            message.channel.send(`Das weiß ich leider nicht: ${err}`);
    }

  });
  client.login(token); // keep it all in one loop for efficiency and readbility
  client.once('ready', () => {
    console.log(`${name} ist bereit`)
    config.activity.streaming
       client.user.setPresence({
        activity: { name: config.activity.game, type: 'WATCHING' },
       })
       client.user.setPresence({
        activity: {
         name: config.activity.game,
         type: 'STREAMING',
         url: 'https://twitch.tv/usrname',
        },
        status: 'idle', // note: the idle icon is overwritten by the STREAMING icon, so this won't do much       
       });
   });

});


const prefix = '-';
const prefix2 = '!;'
require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');
const config = require("./config.json");
const welcome = require("./welcome");
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(prefix + cmdName);


//BÖSE WÖRTER FILTER ( ->->->**So nicht du Jude!**<-<-<-)

client.on('message', async(msg) => {
    

    if(msg.author.bot) return;
    if(!msg.guild) return;

    var array = ['kommunist', 'wichser', 'wixxer', 'wixer', 'wichs', 'wixx', 'wix', 'arschloch', 'hurensohn', 'hs', 'kek', 'simp', 'lauch', 'ausländer', 'dreckssau', 'missgeburt', 'spast', 'spaßt', 'hund', 'kreuzwichser', 'fickfehler', 'jude', 'juden', 'untermensch', 'drecks', 'dreck', 'elendiger', 'elender', 'pic', 'honk', 'gay', 'gae', 'schwuchtel', 'schwulette', 'hund', 'köpek', "gummihandschuh", 'fick', 'kobold', 'nigger', 'neger', 'niger', 'negger', 'kot', 'köter', 'pizza hawaii', 'hawaii', 'lutsch lutsch', 'lutsch', 'blas', 'lutsch mir', 'fuck', 'fuck you', 'Feminist', 'bitch', 'spasti', 'kürbiskopf', 'vaginal',  'vagina', 'blöd', 'dumm', 'arschgefickt', 'piss', 'dick', 'donald trump', 'trump', 'titte', 'titten', 'penis', 'schlong', 'penetration', 'huan', 'huansohn', 'nigga', 'pressack', 'presssack'];

    
        if(array.some(w => ` ${msg.content.toLowerCase()} `.includes(` ${w}`))){
            msg.delete();
            msg.channel.send("<@" + msg.author.id + "> ->->->**So nicht du Jude!**<-<-<-");
            return;
        }
        const goodWords = ['kahba', 'chaya', 'adolf Hitler', 'hitler', 'adolf', 'heil'];
  const match = msg.content.replace(
    new RegExp(goodWords.join("|"), "gi"),
    (word) => `**${word}**`
  );
  if (match !== msg.content)
    // if something changed
    msg.channel
     .send(`${match}\n\nGood Boy! :)`)
     .then((message) => message.delete({ timeout: 3000 }));
});


//BEFEHLE (BEZUG ZU COMMANDS (.js) DATEIEN)

client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        client.commands.get(command).execute(message, args);
    }
    catch {
        message.channel.send("Das weiß ich leider nicht.");
    }
});
