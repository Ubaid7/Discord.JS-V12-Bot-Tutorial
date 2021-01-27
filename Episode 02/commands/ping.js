module.exports = {
    name: 'ping',
    description: 'Smple Ping Command', //Optional
    execute(message, args){
        message.channel.send('Pong!')
    }
}
