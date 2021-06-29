const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = (client) => {
    client.on('guildCreate', (guild) => {
        let prefix = db.fetch(`prefix_${guild.id}`) // Get prefix Of Server
        if(!prefix || prefix === null) prefix = '+'

        let joinmessagechannel
        guild.channels.cache.forEach((channel) => { // Fetch Channel Which Is Text Channel And Bot Has Pemrission To Send Messsages
            if(channel.type === 'text' && !joinmessagechannel && channel.permissionsFor(guild.me).has('SEND_MESSAGES')) 
            joinmessagechannel = channel
        })

        if(!joinmessagechannel) return 

        joinmessagechannel.send(
            new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setColor('BLUE')
            .setDescription(`
My Prefix Is **${prefix}**
Add Your Stuff Here...
            `)
        )
    })
}