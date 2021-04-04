const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['tempban', 'tempb'],// You Can Keep Any Name
    description: 'Temp bans A User.',  // Optional
    permissions: 'BAN_MEMBERS', // You Can Keep Any Permission
    permissionError: 'You Dont Have Perms To Temp Ban Someone',
    expectedArgs: '+tempban @User Time', // Optional

    callback: async(message, args) => {

        const member = message.mentions.members.first()
        if(!member) return  message.reply('Please Mention A User to Temp Ban.') //If User In Not Mentioned

        const time = args [1]
        if(!time) return message.reply('Specify Time to Temp Ban.') // If Time Is Not Provided

        await member.ban()

        const embed = new MessageEmbed()
        .setTitle('User Temp Banned')
        .setDescription(`<@${member.user.id}> Is Temp Banned for ${time}.`)
        .addField('Banned By:-', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)

        // Unban A User After Time Is Finished
        setTimeout(async () => {
            await message.guild.members.unban(member)
            message.channel.send(`<@${member.user.id}> Has Been Unbanned After ${time} Of Ban.`)
        }, ms(time))


    }
}