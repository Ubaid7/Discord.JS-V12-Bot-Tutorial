module.exports = {
    commands: ['youtube', 'yt'], // You Can Keep Any Name
    description: 'Sends YT Link', // Optional
    callback: (message, args) => {
        message.channel.send('https://youtube.com/techtipcyber')
    }
}