const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['sell'], // You Can Keep Any Name
    description: 'Sell Fish Rod', // Optional

    callback: async(message, args, client) => {

        if(args[0].toLowerCase() === 'fish' && args[1].toLowerCase() === 'rod') { // You Can Keep Any Name
            const user = message.member
            const amount = 8000 // Amount Of Fish Rod To Sell: $8s,000
            const fishrod = db.fetch(`fishrod_${user.id}`) // Get User's Fish Rod 
            if(fishrod === null || fishrod === 0) { // If User Doesn't Have Fish Rod
                return message.reply(`You Don't Have Fish Rod To Sell It`)
            } else if(fishrod !== null || fishrod !== 0) { // If User Has Fish Rod
                const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} Sold`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
<@${user.id}> Sold **1** *Fish Rod* For \`$8,000\`
                `)
                .setFooter('Shop')
                message.channel.send(embed)
                db.subtract(`fishrod_${user.id}`, 1) // Remove 1 Fish Rod From User
                db.add(`money_${user.id}`, amount) // Add Money To User
            }
        }
    }
}