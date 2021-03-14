const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['serverinfo', 'server-info', 'si'], // You Can Keep Any Name
    description: 'Gives Info About A Server', // Optional

    callback: (message, args) => {

        const { guild } = message
        const icon = message.guild.iconURL() // Icon Of Server
        const roles = message.guild.roles.cache.map(e => e.toString()) // Roles Of Server
        const emojis = message.guild.emojis.cache.map(e =>  e.toString()) // Emojis Of Server
        const emojicount = message.guild.emojis.cache 
        const members = message.guild.members.cache // Members In Server
        const create = message.guild.createdAt.toLocaleDateString() // Server Create Date 

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Server Info')
        .setThumbnail(`${icon}`)
        .addField('Server Onwer:-', guild.owner)
        .addField('Server ID:-', guild.id)
        .addField('Server Creation Date:-', create)
        .addField('Boost Count:-', guild.premiumSubscriptionCount)
        .addField('Boost Level:-', guild.premiumTier)
        // You Can Add Any Emoji
        .addField('Member Count:-', `${members.size}\n${members.filter(member => !member.user.bot).size}(Human)\n${members.filter(member => member.user.bot).size}(BOT)`)
        .addField('Mmeber Stats:-', `${guild.members.cache.filter(member => member.presence.status == 'online').size}:-🟢\n${guild.members.cache.filter(member => member.presence.status == 'idle').size}:-🟡\n${guild.members.cache.filter(member => member.presence.status == 'dnd').size}:-🔴\n${guild.members.cache.filter(member => member.presence.status == 'offline').size}:-⚫\n`)
        .addField('Highest Role:-', guild.roles.highest)
        .addField('Roles:-', `${roles}`, true) // <true> Means All Roles Will Come In Line
        .addField('Emoji Count:-', `${emojicount.size}\n${emojicount.filter(emoji => !emoji.animated).size}(Non Animated)\n${emojicount.filter(emoji => emoji.animated).size}(Animated)`)
        .addField('Emojis:-', `${emojis}`, true) // <true> Means All Emojis Will Come In Line // This Will All Emojis Of Server
        // You Can Add Any Emoji
        .addField('Server Stats:-', `${guild.channels.cache.filter(channel => channel.type == 'text').size}⌨️\n${guild.channels.cache.filter(channel => channel.type == 'voice').size}🔈\n${guild.channels.cache.filter(channel => channel.type == 'news').size}📢\n${guild.channels.cache.filter(channel => channel.type == 'category').size}📁`)
        .setFooter('Server Info', icon)
        // Add More Fields If You Want, I Have Added Main One's
        message.channel.send(embed)
    }
}