const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['unban', 'ub'], // You Can Keep Any Name
    description: 'Unbans A User Using Its ID',  // Optional
    permissions: 'BAN_MEMBERS', // You Can Keep Any Permission
    permissionError: 'You Dont Have Perms To Unban Someone',
    expectedArgs: '+unban User-ID', // Optional

    callback: (message, args) => {

        const userID = args[0]
        if(!userID) return message.reply('You Need To Unban Using User\'s ID.') // If User ID Is Not Provided.

        // To See If User Is Banned
        message.guild.fetchBans().then(bans => {
            if(bans.size == 0) return
            let bannedUser = bans.find(b => b.user.id == userID)

            if(bannedUser) { // If User Is Banned Then BOT Will Unban

                const embed =  new MessageEmbed()
                .setTitle('User Unbanned')
                .setDescription(`<@${userID}> Has been Unbanned`)
                .addField('Unbanned By:-', message.author)
                .addField('User ID:-', userID)
                .setColor('RANDOM')

                message.channel.send(embed).then(message.guild.members.unban(bannedUser.user))
            } else {
                message.reply('Invalid Banned User ID.') // If User Is Not Banned.
            }
        })


    }
}