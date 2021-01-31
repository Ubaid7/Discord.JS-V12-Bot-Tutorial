const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['mute', 'm'], // You Can Keep Any Name
    description: 'Mutes A User.', // Optinal
    permissions: 'MANAGE_CHANNELS', // You Can Keep Any Permission
    permissionError: 'You Dont Have Perms To Mute Someone', 
    expectedArgs: '+mute @User', // Optinal

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Please Mention A User To Mute.')
        member.roles.add('801728021438005288') // Add Mute Role to User
        if(member.roles.cache.has('801728021438005288')) return message.reply('User Is Already Muted.') // If User Is Already Muted.

        const embed = new MessageEmbed()
        .setTitle('User Muted')
        .setDescription(`<@${member.user.id}> Has Been Muted.`)
        .addField('Muted By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}