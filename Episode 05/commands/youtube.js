module.exports = {
    commands: ['youtube', 'yt'],
    description: 'Sends YT Channel Link', //Optional
    callback: (message, args) => {
        message.channel.send('https://youtube.com/techtipcyber')
    }
}
