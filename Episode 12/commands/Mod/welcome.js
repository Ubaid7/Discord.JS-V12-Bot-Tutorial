const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    const welcomechannelId = '788270829581762580' //Channel You Want to Send The Welcome Message
    const targetChannelId = `788271045660246077` //Channel For Rules

    client.on('guildMemberAdd', (member) => {
        // console.log(member)
        
//         const welocmemessage = ` <@${member.id}> Welcome To Our Server,
// Please Read ${member.guild.channels.cache.get(targetChannelId).toString()}
// Have A Nice Time!`
        const channel = member.guild.channels.cache.get(welcomechannelId)
    //     channel.send(welocmemessage)
    // })

    const embed = new MessageEmbed()
                .setTitle(`Welcome to Tech Tip Cyber!`)
                .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
                .setDescription(`Hello <@${member.id}> Welcome to **Tech Tip Cyber** <:TTC:787456532971388949>.
                Thanks For Joining Our Community.
                Please Read ${member.guild.channels.cache.get(targetChannelId).toString()} and Verify YourSelf to Get Full Access to Server.`)
                .setTimestamp()
                .setImage('https://media.discordapp.net/attachments/774361379628253215/801364912668016670/TTC.png')
                .setFooter('Joined', member.user.displayAvatarURL({dynamic: true, size: 512}))
                .setColor('RANDOM')
                channel.send(embed)
            })

    const leavechannelId = '788272431868936194' //Channel You Want to Send The Leave Message

    client.on('guildMemberRemove', (member) => {
        const leavemessage = `<@${member.id}> Just Left Server.`

        const channel1 = member.guild.channels.cache.get(leavechannelId)
        channel1.send(leavemessage)
    })
}