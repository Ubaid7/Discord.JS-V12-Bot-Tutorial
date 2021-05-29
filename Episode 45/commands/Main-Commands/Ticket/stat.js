const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db

module.exports = {
    commands: ['stat-ticket', 'ticket-stat', 'stats-ticket', 'ticket-stats'], // You Can Keep Any Name
    description: 'See How Many Tickets You Have Opened', // Optional
    
    callback: async(message, args, client) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        const total = db.fetch(`ticket-user-total_${user.id}`) // To Get Total Tickets Opened
        const closed = db.fetch(`ticket-user-closed_${user.id}`) // To Get Ticket Which Were Closed
        const opened = total - closed // Using Maths We Get Opened Tickets

        const embed = new MessageEmbed()
        .setAuthor(`Ticket Stats`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
Total Tickets Opened: **${total}**
Opened Tickets: **${opened}**
        `)
        message.channel.send(embed)
    }
}