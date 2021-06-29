const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['remove-money', 'removemoney'], // You Can Keep Any Name
    description: 'Remove Money From User', // Optional
    permissions: 'ADMINISTRATOR', // You Can Keep Any Permission
    permissionError: 'You Cant Remove Money', // Optional

    callback :(message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply('Whom You Want Remove Money From?') // if No User Is Mentioned(Using ID/Ping)
         
        const money = args[1]
        if(!money) return message.reply('How Much **$** You Want To Remove?')
        if(isNaN(parseInt(args[1]))) return message.reply(`**${money}** Isn't A Number`)

        db.subtract(`money_${user.id}`, money) // Same As balance.js // `bank_${user.id}` Keep This If You Want To Add To Bank

        const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} Removed Money`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
Removed **$${money}** From <@${user.id}>
        `)
        .addField('Removed By:-', `<@${message.author.id}>`)
        message.channel.send(embed)
    }
}