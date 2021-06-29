const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['removelevel', 'remove-level'], // You Can Keep Any Name
    description: 'Removes Level From User', // Optional
    permissions: 'MANAGE_GUILD', // You Can Keep Any Permissions
    permissionError: 'You Dont Have Perms To Add Level To Someone', // Optional

    callback: async (message, args, client) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        const level = db.fetch(`level_${message.guild.id}_${user.id}`)
        const XP = db.fetch(`xp_${message.guild.id}_${user.id}`)

        const removelevel = args[1]

        if (!removelevel) return message.reply(`How Many Level You Want To Remove?`) // If No XP Is Given
        else if (isNaN(parseInt(args[1]))) return message.reply('Level Isn\'t A Number') // If XP Is Not A Number
        else if (removelevel > level) return message.reply(`You Can't Remove That Many Levels`) // If User Has Less Then Remaining Levels After Removed
        else {
            const newlevel = parseInt(level) - parseInt(removelevel)
            db.subtract(`level_${message.guild.id}_${user.id}`, removelevel)
            message.channel.send(`Removed **${removelevel}** From ${user.user.username}, Now They Are Level **${newlevel}**`)
        }
    }
}
