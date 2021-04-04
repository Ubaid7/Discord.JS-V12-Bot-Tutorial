const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db
const ms = require('parse-ms') // npm i parse-ms

module.exports = {
    commands: ['beg'], // You Can Keep Any Name
    description: 'Beg For Money', // Optional

    callback: (message, args) => {

        const user = message.member
        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min) ) + min
        }

        const timeout = 60000 // 1 Min In MiliSecond
        const amount = Math.floor(Math.random() * 900) + 100 // Min Is 100 And Max Is 1000(100+900)
        
        let names = [ // Find More Names In Description
            'Sir Cole Jerkin',
            'Kim Kardashian',
            'Logan Paul',
            'Mr.Clean',
            'Ryan Gosling',
            'Ariana Grande',
            'Default Jonesy',
            'Cardi B',
            'Dwight Shrute',
            'Jesus',
            'Taylor Swift',
            'Beyoncé',
            'Bill Clinton',
            'Bob Ross',
            'The Rock:',
            'The Rock',
            'Mike Hoochie',
            'Doot Skelly',
            'Ayylien',
            'Spoopy Skelo'
        ]

        const name = Math.floor(Math.random() * names.length) // To Get Random Name

        let options = [
            'Success',
            'Failed'
        ]
        let begged = random(0, parseInt(options.length))
        let final = options[begged]
        const begtime = db.fetch(`beg-time_${user.id}`) // Keep `beg-time_${message.guild.id}_${user.id}` If You Want Different In All Servers

        if(begtime !== null && timeout - (Date.now() - begtime) > 0) {
            const timeleft = ms(timeout - (Date.now() - begtime))

            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Begged`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
Already Begged, Beg Again In **${timeleft.seconds} Seconds**
Default CoolDown Is **1 Minutes**
            `)
            message.channel.send(embed)
        } else {
            if(final === 'Success') {
                let gave = [
                    'Donated',
                    'Gave'
                ]
                const give = Math.floor(Math.random() * gave.length)

                db.add(`money_${user.id}`, amount)
                const embed1 = new MessageEmbed()
                .setAuthor(`${user.user.username} Begged`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
**${names[name]}**: ${gave[give]} **$${amount}** To <@${user.user.id}>
                `)
                message.channel.send(embed1)
                db.set(`beg-time_${user.id}`, Date.now())
            } else if(final === 'Failed') {

                let notgave = [
                    `I Don't Have Money`,
                    `I Am Also Poor`,
                    `I Already Gave Money To Last Beggar`,
                    `Stop Begging`,
                    `Go Away`
                ]
                const notgive = Math.floor(Math.random() * notgave.length)

                const embed2 = new MessageEmbed()
                .setAuthor(`${user.user.username} Begged`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
**${names[name]}**: ${notgave[notgive]}
                `)
                message.channel.send(embed2)
                db.set(`beg-time_${user.id}`, Date.now())
            }
        }
    }
}