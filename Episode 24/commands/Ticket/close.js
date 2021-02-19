module.exports = {
    commands: ['close-ticket', 'ct'], // You Can Keep Any Name
    permissions: 'MANAGE_CHANNELS', // You Can Keep Any Permission
    permissionError: 'You Cant Use This Command', // Optional
    description: 'Close A Opened Ticket', // Optional

    callback: (message, args) => {
        if(!message.channel.name.includes('ticket')) return message.reply('You Cant Delete A Normal Channel.') // If Non Ticket Channel Is Tried To Delete
        message.channel.delete()
    }
}