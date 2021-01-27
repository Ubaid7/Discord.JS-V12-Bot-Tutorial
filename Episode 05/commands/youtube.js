module.exports = {
    commands: ['youtube', 'yt'],
    description: 'Sends YT Link', //Optional
    callback: (message, args) => {
        message.channel.send('https://youtube.com/techtipcyber')
    }
}
