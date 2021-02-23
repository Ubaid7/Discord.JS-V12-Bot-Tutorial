const { MessageEmbed } = require('discord.js')
const moment = require('moment') // npm i moment
moment.locale('ENG')

module.exports ={
    commands: ['userinfo', 'user-info', 'ui', 'memberinfo', 'member-info', 'mi'], // You Can Keep Any Name
    description: 'Shows User Info About A User or Pinged User.', // Optional

    callback: (message, args) => {

        const member = message.mentions.members.first() || message.member
        // For Status Of User, We Will Use Emoji To Look Nice
        const status = {
            online: '🟢:- Online',
            idle: '🟡:- Idle',
            dnd: '🔴:- DND',
            offline: '⚫:- Offline'
        }

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`User Info Of ${member.user.username}`, member.user.displayAvatarURL())
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
        .addField('<a:Right:805663924267384852> **User-Name**', `${member.user.username}#${member.user.discriminator}`) // We Use Emojis Also
        .addField('<a:Right:805663924267384852> **User ID**', `${member.id}`)
        .addField('<a:Right:805663924267384852> **Status**', `${status[member.presence.status]}`)
        .addField('<a:Right:805663924267384852> **Account Created**', `${moment.utc(member.user.createdAt).format('LLLL')}`)
        .addField('<a:Right:805663924267384852> **Joined Server**', `${moment.utc(member.joinedAt).format('LLLL')}`)
        .addField('<a:Right:805663924267384852> **VC**', member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'Not In A VC')
        .addField('<a:Right:805663924267384852> **Roles**', `${member.roles.cache.map(role => role.toString())}`, true)
        // Add More Fields If Want
        message.channel.send(embed)
    }
}