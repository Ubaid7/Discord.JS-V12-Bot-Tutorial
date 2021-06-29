const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['addxp', 'add-xp'], // You Can Keep Any Name
    description: 'Adds XP To User', // Optional
    permissions: 'MANAGE_GUILD', // You Can Keep Any Permissions
    permissionError: 'You Dont Have Perms To Add XP To Someone', // Optional

    callback: async (message, args, client) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        const level = db.fetch(`level_${message.guild.id}_${user.id}`)
        const XP = db.fetch(`xp_${message.guild.id}_${user.id}`)
        const XPneeded = level * 2 * 250 + 250 // Level 1 = 250, Level 2 = 750, Level 3 = 1750, Level 4.....

        const addxp = args[1]

        if (!addxp) return message.reply(`How Much XP You Want To Add?`) // If No XP Is Given
        else if (isNaN(parseInt(args[1]))) return message.reply('XP Isn\'t A Number') // If XP Is Not A Number
        else if (addxp > XPneeded) return message.reply(`You Can't Add That Much, Instead Use Add Level Command`)
        else {
            const newXP = parseInt(XP) + parseInt(addxp)
            db.add(`xp_${message.guild.id}_${user.id}`, addxp)
            db.add(`xpTotal_${message.guild.id}_${user.id}`, addxp)
            message.channel.send(`Added **${addxp}** To ${user.user.username}, Now They Are Level **${level}** With XP **${newXP}**`)
        }
    }
}
