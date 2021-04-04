const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['deposit', 'dep'], // You Can Keep Any Name
    description: 'Deposit Money To Bank', // Optional

    callback: async(message, args, client) => {

        const user = message.member
        const totalCashInWallet = db.fetch(`money_${user.id}`) // Same As balance.js // Get User Money In Wallet
        if(totalCashInWallet === null || totalCashInWallet === 0) return message.reply('You Don\'t Have Money In Wallet')
        if(args[0] === 'all') {  // If Someone Does `+dep all` All Money To Bank
        const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} Deposit`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.user.id}> Have Deposited **$${totalCashInWallet}** To Bank
        `)
        message.channel.send(embed)
        db.subtract(`money_${user.id}`, totalCashInWallet) // Remove Money From Wallet
        db.add(`bank_${user.id}`, totalCashInWallet) // Add Money To Bank
        } else { // If Someine Does `+dep (Some Amount)`
        const amount = args[0]
        if(!amount) return message.reply('How Much Money You Want To Deposit?') //  If No Money(No.) Is Provided
        else if(amount % 1 != 0 || amount <= 0) return message.reply('You Cant Deposit -ve Money or Fractioned Money')
        else if(amount > totalCashInWallet) return message.reply('You Dont Have That Much Money In Wallet')
        else {
            const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} Deposit`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.user.id}> Have Deposited **$${amount}** To Bank
        `)
        message.channel.send(embed)
        db.subtract(`money_${user.id}`, amount) // Remove Money From Wallet
        db.add(`bank_${user.id}`, amount) // Add Money To Bank
        }
        }
    }
}