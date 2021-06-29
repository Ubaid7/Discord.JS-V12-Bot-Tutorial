const { GiveawaysManager } = require('discord-giveaways') // npm i discord-giveaways
const ms = require('ms') // npm i ms
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
            case `${prefix}gedit`: // Edit GiveAway Command
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`You Don't Have Permission To Use This`) // If User Has No Permission

            let messageID = args[1]
            if(isNaN(messageID)) return message.reply(`Messsage ID Isn't A Number`) // If Message ID Isn't A Number
            if(!messageID) return message.reply(`No Message ID Provided`) // If No Message ID Is Provided
            let gwduration = args[2]
            if(!gwduration) return message.reply(`Provide New Duration, It Will Be Added To Old Duration`)
            let gwwinners = args[3]
            if(!gwwinners) return message.reply(`Provide New Winners`)
            let gwprize = args.slice(4).join(' ')
            if(!gwprize) return message.reply(`Proive New Prize`)
            client.giveawaysManager.edit(messageID, { // Edit GiveAway
                newWinnerCount: gwwinners, // New Winner(s)
                newPrize: gwprize, // New Prize
                addTime: ms(gwduration) // New Duration, Added To Old
            }).then(() => {
                message.channel.send(`GiveAway Successfully Edited`)
            }).catch((_err) => { // If Their Is Error...
                message.reply(`No GiveAway With **${messageID}** Is Available`)
            })
        }
    })
}