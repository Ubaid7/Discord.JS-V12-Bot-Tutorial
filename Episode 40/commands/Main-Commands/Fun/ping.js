module.exports = {
    commands: ['p', 'ping'], // You Can Keep Any Name
    description: 'Smple Ping Command', //Optional
    callback: (message, args) => {
        message.channel.send('Pong!')
    }
}