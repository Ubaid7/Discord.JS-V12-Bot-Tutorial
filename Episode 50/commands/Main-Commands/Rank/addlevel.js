const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    commands: ['addlevel', 'add-level'], // You Can Keep Any Name
    description: 'Adds Level To User', // Optional
    permissions: 'MANAGE_GUILD', // You Can Keep Any Permissions
    permissionError: 'You Dont Have Perms To Add Level To Someone', // Optional

    callback: async (message, args, client) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        const level = db.fetch(`level_${message.guild.id}_${user.id}`)
        const XP = db.fetch(`xp_${message.guild.id}_${user.id}`)

        const addlevel = args[1]

        if (!addlevel) return message.reply(`How Much Level You Want To Add?`) // If No Level Is Given
        else if (isNaN(parseInt(args[1]))) return message.reply('Level Isn\'t A Number') // If Level Is Not A Number
        else {
            const newlevel = parseInt(level) + parseInt(addlevel)
            db.add(`level_${message.guild.id}_${user.id}`, addlevel)
            message.channel.send(`Added **${addlevel}** To ${user.user.username}, Now They Are Level **${newlevel}**`)
        }
    }
}
