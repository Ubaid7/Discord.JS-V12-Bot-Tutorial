const db = require('quick.db')

module.exports = {
    commands: ['setchatbot', 'set-chat-bot'], // You Can Keep Any Name
    description: 'Set Chat Bot Channel', // Optional
    permissions: 'MANAGE_CHANNELS', // // You Can Keep Any Permission
    permissionError: 'You Dont Have Permission To Use This Command', // Optional

    callback: async(message, args, client) => {
        const channel = args[0]
        if(!channel) return message.reply('Which Channel you You Want To Set As Chat Bot?') // If No Channel is Provided
        if(isNaN(parseInt(args[0]))) return message.reply('Channel ID Isn\'t A Number') // If Channel ID Is Provided As Name
        const chatbotchannel = db.fetch(`chatbotchannel_${message.guild.id}`) // Get ChatBoChannel
        if(chatbotchannel !== null) return message.reply(`Chat Bot Channel Is Already Set. Current Channel Is <#${chatbotchannel}>. Reset Channel To Set Again`) // If Channel is Already Set
        else if(chatbotchannel === null) { // If Channel is Not Set Then...
            message.reply(`Chat Bot Channel Set To <#${channel}>`)
            db.set(`chatbotchannel_${message.guild.id}`, channel) // Set Chat Bot Channel
        }

    }
}