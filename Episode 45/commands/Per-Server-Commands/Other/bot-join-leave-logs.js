const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    const logchannel = client.channels.cache.get('844145613041565706') // Log Channel

    // Join Log
   client.on('guildCreate', (guild) => { // When Bot Is Added To New Server
    const embed = new MessageEmbed()
    .setAuthor('New Server', guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setColor('GREEN')
    .addField('Guild Name:', guild.name, true)
    .addField('Guild ID:', guild.id, true)
    .addField('Owner Name:', guild.owner)
    .addField('Owner ID:', guild.owner.id)
    .addField('Member In Server:', guild.memberCount)
    .addField(`Server's:`, `Now I Am In **${client.guilds.cache.size}** Servers With **${client.users.cache.size}** User`)
    .setFooter()
    logchannel.send(embed)
   })

    // Leave Log
   client.on('guildDelete', (guild) => { // When Bot Is Removed From Server
    const embed = new MessageEmbed()
    .setAuthor('Server Left', guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setColor('RED')
    .addField('Guild Name:', guild.name, true)
    .addField('Guild ID:', guild.id, true)
    .addField('Owner Name:', guild.owner)
    .addField('Owner ID:', guild.owner.id)
    .addField('Member In Server:', guild.memberCount)
    .addField(`Server's:`, `Now I Am In **${client.guilds.cache.size}** Servers With **${client.users.cache.size}** User`)
    .setFooter()
    logchannel.send(embed)
   })

}