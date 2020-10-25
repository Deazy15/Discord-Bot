module.exports = (client) => {
  const channelId = '766761508427530250' // welcome channel 

  client.on('guildMemberAdd', (member) => {
      console.log(member);

      const welcomes = [

        `Der treue Kamerad <@${member.id}> schließt sich dem Reich an, Herzlich Willkommen bei ${member.guild}!`, `Heißt <@${member.id}> Herzlich Willkommen bei ${member.guild}!`, `Sei gegrüßt, ${member}, möge dich die Gemeinschaft begrüßen!`, `Ich rieche Ju.. Neulinge! Herzlich Willkommen ${member} auf ${member.guild}!`];

        
      const message = `${
          welcomes[Math.floor(Math.random() * welcomes.length)]
         } Bitte lesen Sie sich die ${member.guild.channels.cache.get(
          '766731745960919052'
         )} durch und reagieren Sie auf die Nachricht, um vollen Zugang zu unserem Server zu erhalten.`;

         const channel = member.guild.channels.cache.get(channelId)
         channel.send(message) 
         });
      };
    


// const message = `Der treue Kamerad <@${member.id}> schließt sich dem Reich an! Bitte lesen Sie sich die ${member.guild.channels.cache.get(targetChannelId).toString()} durch und reagieren Sie auf die Nachricht, um vollen Zugang zu unserem Server zu erhalten.`
// const channelId = '766761508427530250' // welcome channel 
// const targetChannelId = '766731745960919052' //rules and info