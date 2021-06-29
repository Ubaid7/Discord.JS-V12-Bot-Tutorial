const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['removexp', 'remove-xp'], // You Can Keep Any Name
    description: 'Removes XP From User', // Optional
    permissions: 'MANAGE_GUILD', // You Can Keep Any Permissions
    permissionError: 'You Dont Have Perms To Add XP To Someone', // Optional

    callback: async (message, args, client) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        const level = db.fetch(`level_${message.guild.id}_${user.id}`)
        const XP = db.fetch(`xp_${message.guild.id}_${user.id}`)
        const xpTotal = db.fetch(`xpTotal_${message.guild.id}_${message.author.id}`)
        const XPneeded = level * 2 * 250 + 250 // Level 1 = 250, Level 2 = 750, Level 3 = 1750, Level 4.....
        const currentXP = XP - 1

        const removeXP = args[1]

        if (!removeXP) return message.reply(`How Much XP You Want To Remove?`) // If No XP Is Given
        else if (isNaN(parseInt(args[1]))) return message.reply('XP Isn\'t A Number') // If XP Is Not A Number
        else if (removeXP > xpTotal) return message.reply(`You Can't Remove That Much XP`) // If User Has Less Then Remaining XP After Removed
        else if (removeXP > currentXP) return message.reply(`You Can't Remove That Much XP, Instead Remove Level`) // If User Has Less Then Remaining XP After Removed
        else {
            const newXP = parseInt(XP) - parseInt(removeXP)
            db.subtract(`xp_${message.guild.id}_${user.id}`, removeXP)
            db.subtract(`xpTotal_${message.guild.id}_${user.id}`, removeXP)
            message.channel.send(`Removed **${removeXP}** From ${user.user.username}, Now They Are Level **${level}** With XP **${newXP}**`)
        }
    }
}
