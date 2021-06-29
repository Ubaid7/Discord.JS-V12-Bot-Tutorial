const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db

module.exports = {
    commands: ['unwarn'], // You Can Keep Any Name
    description: 'UnWarn SomeOne', // Optional
    permissions: 'MUTE_MEMBERS', // You Can Keep Any Permission
    permissionError: 'You Cant Use It', // Optional

    callback: async(message, args, client) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if(!user) return message.reply('Whom Do You Want To UnWanr?') // If No User Is Provided

        const embed = new MessageEmbed()
        .setAuthor(`${user.user.username}`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
<@${user.id}> Was UnWarned By <@${message.author.id}>
        `)
        message.channel.send(embed)
        db.subtract(`warns_${message.guild.id}_${user.id}`, 1) // `warns_${message.guild.id}_${user.id}` Because Warning Will be Different In All Server, If We Keep `warns_${user.id}` Then It Will Show Same Warnings In All Servers // Remove 1 Warning To User
    }
}