const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'kick', // You Can Keep Any Name
    description: 'Kicks A User.', // Optional 
    permissions: 'KICK_MEMBERS', // You Can Keep Any Permissions
    permissionError: 'You Dont Have Perms To Kick Someone',
    expectedArgs: '+Kick @User', // Optional

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('You Need To Mention A Member To Kick.') // Mention To Kick.
        member.kick()

        const embed = new MessageEmbed()
        .setTitle('User Kicked')
        .setDescription(`<@${member.user.id}> Has Been Kicked.`)
        .addField('Kicked By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}