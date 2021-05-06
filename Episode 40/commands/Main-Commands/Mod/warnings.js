const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db

module.exports = {
    commands: ['warnings', 'warning', 'list-warnings', 'list-warning'], // You Can Keep Any Name
    description: 'Show Users Warnings', // Optional

    callback: async(message, args, client) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if(!user) return message.reply('Whose Warnings You Want To See?') // If No User Is Provided

        let warnings = db.fetch(`warns_${message.guild.id}_${user.id}`) // Get Users Warning
        if(warnings === null || warnings === 0) warnings = '0' // If No Warning Are Their

        const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} Warnings`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.id}> Has **${warnings}** Warnings
        `)
        message.channel.send(embed)
    }
}