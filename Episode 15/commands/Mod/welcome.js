const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
    const welcomechannelId = '788270829581762580' //Channel You Want to Send The Welcome Message
    const targetChannelId = `788271045660246077` //Channel For Rules

    client.on('guildMemberAdd', (member) => {
        console.log(member) // If You Want The User Info in Console Who Joined Server Then You Can Add This Line. // Optional
        const channel = member.guild.channels.cache.get(welcomechannelId)

        const embed = new MessageEmbed()
        .setTitle(`Welcome To ${member.guild.name}`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription(`Hello <@${member.user.id}>, Welcome to **${member.guild.name}**. Thanks For Joining Our Server.
Please Read ${member.guild.channels.cache.get(targetChannelId).toString()}. Have a Nice Time.
Chat In <#787083837833871404>`)
        // You Can Add More Fields If You Want
        .setFooter(`Welcome ${member.user.username}#${member.user.discriminator}`,member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor('RANDOM')
    channel.send(embed)
        
    })


    const leavechannelId = '788272431868936194' //Channel You Want to Send The Leave Message

    client.on('guildMemberRemove', (member) => {
        // You Can Do The Same For Leave Message
        const leavemessage = `<@${member.id}> Just Left Server.`

        const channel1 = member.guild.channels.cache.get(leavechannelId)
        channel1.send(leavemessage)
    })
}