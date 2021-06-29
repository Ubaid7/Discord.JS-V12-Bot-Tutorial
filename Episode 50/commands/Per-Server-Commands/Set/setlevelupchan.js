const db = require('quick.db')

module.exports = {
    commands: ['setlevelup', 'set-level-up'], // You Can Keep Any Name
    description: 'Set Level Up Channel', // Optional
    permissions: 'MANAGE_CHANNELS', // // You Can Keep Any Permission
    permissionError: 'You Dont Have Permission To Use This Command', // Optional

    callback: async (message, args, client) => {
        const channel = args[0]
        if (!channel) return message.reply('Which Channel you You Want To Set As Level Up?') // If No Channel is Provided
        if (isNaN(parseInt(args[0]))) return message.reply('Channel ID Isn\'t A Number') // If Channel ID Is Provided As Name

        
        const levelchannel = db.fetch(`levelupchannel_${message.guild.id}`) // Get ChatBoChannel
        if (levelchannel !== null) return message.reply(`LevelUp Channel Is Already Set. Current Channel Is <#${levelchannel}>. Reset Channel To Set Again`) // If Channel is Already Set

        else if (levelchannel === null) { // If Channel is Not Set Then...
            message.reply(`Level Up Channel Set To <#${channel}>`)
            db.set(`levelupchannel_${message.guild.id}`, channel) // Set Level Up Channel
        }
    }
}
