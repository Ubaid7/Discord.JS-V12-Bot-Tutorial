const db = require('quick.db')

module.exports = {
    commands: ['resetlevelup', 'reset-level-up'], // You Can Keep Any Name
    description: 'ReSet Level Up Channel', // Optional
    permissions: 'MANAGE_CHANNELS', // You Can Keep Any Permission
    permissionError: 'You Dont Have Permission To Use This Command', // Optional

    callback: async(message, args, client) => {

        const levelupchannel = db.fetch(`levelupchannel_${message.guild.id}`)
        if(levelupchannel === null) return message.reply(`Level Up Channel Isn't Set.`) // If Level Up Channel Isnot Set
        else if(levelupchannel !== null) { // If Its Set Then...
            message.reply(`Level Up Channel Removed`)
            db.delete(`levelupchannel_${message.guild.id}`) // Delete Level Up Channel
        }

    }
}
