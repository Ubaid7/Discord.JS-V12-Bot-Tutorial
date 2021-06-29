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
            case `${prefix}gstart`: // Start GiveAway Command
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`You Don't Have Permission To Use This`) // If User Has No Permission

            const channel = message.mentions.channels.first()
            if(!channel) return message.reply(`Which Channel You Want The GiveAway To be?`) // If Channel Is Not Mentioned

            const gwduration = args[2]
            if(!gwduration) return message.reply(`What duration You Want For GiveAway?`) // If No Duration Is Given
            else if(isNaN(ms(gwduration))) return message.reply(`What duration You Want For GiveAway?`) // If No Duration Is Given

            const gwwinners = args[3]
            if(!gwwinners) return message.reply(`How Many Winners You Want For GiveAway?`) // If No Winner Is Provided

            const gwprize = args.slice(4).join(' ')
            if(!gwprize) return message.reply(`What Is The Prize For GiveAway?`) // If No Prize Is Provided
            
            client.giveawaysManager.start(channel, { // Satrt GiveAway
                time: ms(gwduration), // Time For GiveAway
                prize: gwprize, // Prize For GiveAway
                winnerCount: gwwinners, // Winners For GiveAway
                hostedBy: message.author, // Who Hosted GiveAway
                messages: {
                    giveaway: '**GiveAway Time**', // Start GiveAway Message
                    giveawayEnded: '**GiveAway Ended**', // End GiveAway Message
                    timeRemaining: 'Time Remaining: **{duration}**', // Time Remaining For GiveAway
                    inviteToParticipate: 'React With 🎉 To Enter GiveAway', // Message For GiveAway
                    winMessage: '🎉 Congrats ${winners}, You Have Won **${prize}**', // Win Message
                    embedFooter: 'GiveAway Time', // Footer Of Embed
                    noWinner: 'No One Reacted...', // If No One Reacted
                    hostedBy: 'Hosted By: {user}', // Who Hosted GiveAway
                    winners: 'Winner(s)', // Winner Coints
                    endedAt: 'Ends At',
                    utils: {
                        seconds: 'seconds',
                        minutes: 'minutes',
                        hours: 'hours',
                        days: 'days',
                        plurals: false
                    }
                }
            })
            message.channel.send(`GiveAway Started In ${channel}`)
            break
        }
    })
}