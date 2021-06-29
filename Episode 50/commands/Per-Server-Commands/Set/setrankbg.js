const db = require('quick.db')

module.exports = {
    commands: ['set-rank-bg'], // You Can Keep Any Name
    description: 'Set Rank BackGround For Server', // Optional
    permissions: 'MANAGE_GUILD', // You Can Keep Any Permission
    permissionError: 'You Dont Have Permission To Use This Command', // Optional

    callback: async(message, args, client) => {

        const link = args[0] // New Link
        if(!link) return message.reply('Provide Link For Rank BackGround') // If No Link Is Added
        else {
            message.reply(`Rank Image Set As **${link}**`)
            db.set(`backgroundrank_${message.guild.id}`, link) // Set New Link(Image)
        }
    }
}
