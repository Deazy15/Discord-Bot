module.exports = {   
    name: 'hymne',
    description: "Sendet Ihnen einen link zur einzig wahren Nationalhymne!",
    // eslint-disable-next-line no-unused-vars
    execute(message, args){
        message.channel.send('https://www.youtube.com/watch?v=07bDBliXS-o');
    }
}