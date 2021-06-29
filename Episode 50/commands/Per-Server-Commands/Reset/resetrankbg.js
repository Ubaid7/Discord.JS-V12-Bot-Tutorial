const db = require('quick.db')

module.exports = {
    commands: ['reset-rank-bg'], // You Can Keep Any Name
    description: 'ReSet Rank BackGround For Server', // Optional
    permissions: 'MANAGE_GUILD', // You Can Keep Any Permission
    permissionError: 'You Dont Have Permission To Use This Command', // Optional

    callback: async(message, args, client) => {

        const link = 'https://i.imgur.com/SpcEOfc.jpg' // New Link
            message.reply(`Rank Image Set As **${link}**`)
            db.set(`backgroundrank_${message.guild.id}`, link) // Set New Link(Image)
    }
}
