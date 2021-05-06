const db = require('quick.db')

module.exports = {
    commands: ['resetchatbot', 'reset-chat-bot'], // You Can Keep Any Name
    description: 'ReSet Chat Bot Channel', // Optional
    permissions: 'MANAGE_CHANNELS', // You Can Keep Any Permission
    permissionError: 'You Dont Have Permission To Use This Command', // Optional

    callback: async(message, args, client) => {

        const chatbotchannel = db.fetch(`chatbotchannel_${message.guild.id}`)
        if(chatbotchannel === null) return message.reply(`Chat Bot Channel Isnot Set.`) // If Chat Bot Channel Isnot Set
        else if(chatbotchannel !== null) { // If Its Set Then...
            message.reply(`Chat Bot Channel Removed`)
            db.delete(`chatbotchannel_${message.guild.id}`) // Delete Chat Bot Channel
        }

    }
}