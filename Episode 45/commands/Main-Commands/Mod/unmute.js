const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['unmute', 'um'], // You Can Keep ANy Name
    description: 'Unmutes A User.', // Optinal
    permissions: 'MANAGE_CHANNELS', // You Can Keep Any Permission
    permissionError: 'You Dont Have Perms To Mute Someone',
    expectedArgs: '+unmute @User', // Optinal

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Please Mention A User To Mute.')
        member.roles.remove('801728021438005288') // Removes Mute Role to User
        if(!member.roles.cache.has('801728021438005288')) return message.reply('User Is Already Unmuted.') // If User Is Already Unmuted.

        const embed = new MessageEmbed()
        .setTitle('User Unmuted.')
        .setDescription(`<@${member.user.id}> Is Now Unmuted.`)
        .addField('Unmuted By', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)
    }
}