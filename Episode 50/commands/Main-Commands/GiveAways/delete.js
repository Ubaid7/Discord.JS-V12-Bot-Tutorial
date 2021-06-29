const { GiveawaysManager } = require('discord-giveaways') // npm i discord-giveaways
const db = require('quick.db')

module.exports = (client) => {
    const manager = new GiveawaysManager(client, {
        storage: '../../../giveaway.json', // Storing Data
        updateCountdownEvery: 10000, // Update The Time In GiveAway Every 10 Seconds
        default: {
            botsCanWin: false, // Can Be true Also
            embedColor: 'RED', // Color Of Embed
            reaction: '🎉' // Reaction For Embed
        }
    })

    client.giveawaysManager = manager
    client.on('message', message => {
        const prefix = db.fetch(`prefix_${message.guild.id}`) // You Can Do const prefix = '+' Also
        const args = message.content.substring(prefix.lenght).split(' ')
        switch (args[0]) {
            case `${prefix}gdelete`: // Delete GiveAway Command
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`You Don't Have Permission To Use This`) // If User Has No Permission

            let messageID = args[1]
            if(isNaN(messageID)) return message.reply(`Messsage ID Isn't A Number`) // If Message ID Isn't A Number
            if(!messageID) return message.reply(`No Message ID Provided`) // If No Message ID Is Provided
            client.giveawaysManager.delete(messageID).then(() => { // Delete GiveAway
                message.channel.send(`GiveAway Successfully Deleted`)
            }).catch((_err) => { // If Their Is Error...
                message.reply(`No GiveAway With **${messageID}** Is Available`)
            })
        }
    })
}