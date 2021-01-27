module.exports = (client) => {
    const welcomechannelId = '78827082958172580' //Channel You Want to Send The Welcome Message
    const targetChannelId = `788271045660246077` //Channel For Rules

    client.on('guildMemberAdd', (member) => {
        console.log(member)
        
        const welocmemessage = ` <@${member.id}> Welcome To Our Server,
Please Read ${member.guild.channels.cache.get(targetChannelId).toString()}
Have A Nice Time!`
        const channel = member.guild.channels.cache.get(welcomechannelId)
        channel.send(welocmemessage)
    })

    const leavechannelId = '788272431868936194' //Channel You Want to Send The Leave Message

    client.on('guildMemberRemove', (member) => {
        const leavemessage = `<@${member.id}> Just Left Server.`

        const channel1 = member.guild.channels.cache.get(leavechannelId)
        channel1.send(leavemessage)
    })
}
