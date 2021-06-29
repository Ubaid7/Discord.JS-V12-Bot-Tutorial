module.exports = {
    commands: ['remove-user', 'remove-ticket'], // You Can Keep Any Name
    permissions: 'MANAGE_CHANNELS', // You Can Keep Any Permission
    permissionError: 'You Cant Use This Command', // Optional
    description: 'Remove User To Ticket', // Optional

    callback: async(message, args, client) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if(!user) return message.reply(`Whom Do You Want To Remove To Ticket?`) // If No User Is Provided
        message.channel.updateOverwrite(user.user, {
            VIEW_CHANNEL: false
        }) // Permissions
        message.channel.send(`Removed <@${user.id}> From <#${message.channel.id}>`)
    }
}