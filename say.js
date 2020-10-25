module.exports.run = async (client, message, args) => { 

    const sayMessage = args.join(" ");
    message.delete();
    message.channel.send(sayMessage + ' - ' + message.author)
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "founder"
  };

  exports.help = {
    name: "say",
    category: "Miscellaneous",
    description: "say command",
    usage: "say"
};

client.on('message', function(message) {
  if(message.author.bot) return;

  else if(isValidCommand(message, "say")) {

      // removes "say "(yes with one space, if you need to add the prefix to it make it (5))
      let sendMessage = message.content.substring(4);

      // Channel that you want to send the message to
      let sendChannel = client.channels.cache.get('767374258492932106');

      // Sends message to the Channel you defined above/
      sendChannel.send(sendMessage)
  }
});
