const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'ban', // You Can Keep Any Name
    description: 'Bans A User.', // Optional 
    permissions: 'BAN_MEMBERS', // You Can Keep Any Permissions
    permissionError: 'You Dont Have Perms To Ban Someone',
    expectedArgs: '+ban @User', // Optional

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('You Need To Mention A Member To Ban.') // Mention To Ban.
        member.ban()

        const embed = new MessageEmbed()
        .setTitle('User Banned')
        .setDescription(`<@${member.user.id}> Has Been Banned.`)
        .addField('Banned By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}