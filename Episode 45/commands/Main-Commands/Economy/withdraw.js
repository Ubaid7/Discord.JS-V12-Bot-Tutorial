const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['withdraw', 'with', 'with-draw'], // You Can Keep Any Name
    description: 'Withdraw Money From Bank', // Optional

    callback: async(message, args, client) => {

        const user = message.member
        const totalCashInBank = db.fetch(`bank_${user.id}`) // Same As balance.js // Get User Money In Bank
        if(totalCashInBank === null || totalCashInBank === 0) return message.reply('You Don\'t Have Money In Bank')
        if(args[0] === 'all') { // If Someone Does `+with all` All Money To Wallet
        const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} WithDrew`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.user.id}> Have WithDrew **$${totalCashInBank}** From Bank
        `)
        message.channel.send(embed)
        db.subtract(`bank_${user.id}`, totalCashInBank) // Remove Money From Bank
        db.add(`money_${user.id}`, totalCashInBank) // Add Money To Wallet
        } else {
            const amount = args[0]
            if(!amount) return message.reply('How Much Money You Want To WithDrwa?')
            else if(amount % 1 != 0 || amount <= 0) return message.reply('You Cant WithDraw -ve Money or Fractioned Money')
            else if(amount > totalCashInBank) return message.reply('You Dont Have That Much Money In Bank')
            else {
                const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} WithDrew`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.user.id}> Have WithDrew **$${amount}** From Bank
        `)
        message.channel.send(embed)
        db.subtract(`bank_${user.id}`, amount) // Remove Money From Bank
        db.add(`money_${user.id}`, amount) // Add Money To Wallet
            }
        }
    }
}