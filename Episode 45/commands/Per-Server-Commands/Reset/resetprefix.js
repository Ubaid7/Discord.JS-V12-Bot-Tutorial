const db = require('quick.db')

module.exports = {
    commands: ['reset-prefix'], // You Can Keep Any Name
    description: 'ReSet Prefix For Server', // Optional
    permissions: 'MANAGE_GUILD', // You Can Keep Any Permission
    permissionError: 'You Dont Have Permission To Use This Command', // Optional

    callback: async(message, args, client) => {

        const prefix = db.fetch(`prefix_${message.guild.id}`) // Get Old Prefix
        if(prefix === null) return message.reply('Prefix Not Set For This Server') // If No Prefix Is Set Yet
        else if(prefix !== null) { // If Prefix Is Set Then...
            message.reply('Prefix Reset To **+**')
            db.delete(`prefix_${message.guild.id}`) // Delete Prefix And Set To Default Prefix
        }
    }
}