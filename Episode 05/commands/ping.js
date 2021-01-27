module.exports = {
    commands: ['p', 'ping'],
    description: 'Smple Ping Command', //Optional
    callback: (message, args) => {
        message.channel.send('Pong!')
    }
}
