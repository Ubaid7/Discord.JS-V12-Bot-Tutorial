const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // For Prefix

module.exports = (client) => {
    client.on('message', message => {
        const prefix = db.fetch(`prefix_${message.guild.id}`)
        if(message.content.toLowerCase() === `${prefix}uptime` || message.content.toLowerCase() === `${prefix}bot-uptime`) {
            const days = Math.floor(client.uptime / 86400000)
            const hours = Math.floor(client.uptime / 3600000) % 24 // 1 Day = 24 Hours
            const minutes = Math.floor(client.uptime / 60000) % 60 // 1 Hour = 60 Minutes
            const seconds = Math.floor(client.uptime / 1000) % 60 // 1 Minute = 60 Seconds
 
            //  Send As Embed
            const embed = new MessageEmbed()
            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
My Uptime Is:-
\`${days}\` Days \`${hours}\` Hours \`${minutes}\` Minutes \`${seconds}\` Seconds
            `)
            message.channel.send(embed)
        }
    })
}