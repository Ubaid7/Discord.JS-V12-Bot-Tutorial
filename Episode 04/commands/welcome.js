module.exports = (client) => {

  // Welcome Message Command
    const welcomechannelId = '' //Channel You Want to Send The Welcome Message
    const targetChannelId = `` //Channel For Rules

    client.on('guildMemberAdd', (member) => {
        console.log(member)
        
        const welocmemessage = ` <@${member.id}> Welcome To Our Server,
Please Read ${member.guild.channels.cache.get(targetChannelId).toString()}
Have A Nice Time!`
        const channel = member.guild.channels.cache.get(welcomechannelId)
        channel.send(welocmemessage)
    })
    
    // Leave Message Command

    const leavechannelId = '' //Channel You Want to Send The Leave Message

    client.on('guildMemberRemove', (member) => {
        const leavemessage = `<@${member.id}> Just Left Server.`

        const channel1 = member.guild.channels.cache.get(leavechannelId)
        channel1.send(leavemessage)
    })
}
