const db = require('quick.db')
const fetch = require('node-fetch')

module.exports = (client) => {
    client.on('message', message => {
        const channel = db.fetch(`chatbotchannel_${message.guild.id}`)
        if(message.author.bot) return // If Bot Messages Then It Will Stop(Not Work)
        if(message.channel.type === 'dm') return // If Message Is Sent In DMs Then It Will Stop(Not Work)
        if(message.channel.id === channel){
            if(message.attachments.size > 0) return message.reply('I Cant read Images') // If Images Are Sent
            else {
                fetch(`API_URL${encodeURIComponent(message)}`).then(res => res.json()) // Get API URL From https://brainshop.ai/ // Dont Show AnyOne API URL, Its Same As Token For BOT
                .then(data => {
                    message.channel.send(`> ${message}\n${data.cnt}`)
                })
            }
        } else if(channel === null) return // If No Chat Bot Channel Is Set Then It Will Stop(Not Work)
    })
}