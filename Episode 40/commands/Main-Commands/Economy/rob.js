const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms') // npm i parse-ms

module.exports = {
    commands: ['rob'], // You Can Keep Any Name
    description: 'Rob SomeOne For Money', // Optional

    callback: async(message, args, client) => {

        const user = message.member
        const mention = message.mentions.members.first()
        if(!mention) return message.reply('Whom Do You Want Rob?')
        const usermoney = db.fetch(`money_${user.id}`) // Same As balance.js // Get User Money
        const mentionmoney = db.fetch(`money_${mention.id}`) // Same As balance.js // Get Mentioned User Money

        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min) ) + min
        }
        const timeout = 60000 // 1 Min In MiliSecond

        let options = [
            'Success',
            'Failed',
            'Paid'
        ]
        let robbed = random(0, parseInt(options.length))
        let final = options[robbed]
        const robtime = db.fetch(`robtime_${user.id}`)

        if(robtime !== null && timeout - (Date.now() - robtime) > 0) { // CoolDown
            const timeleft = ms(timeout - (Date.now() - robtime))

            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Robbed`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
Already Robbed, Rob Again In **${timeleft.seconds} Seconds**
Default CoolDown Is **1 Minutes**
            `)
            message.channel.send(embed)
        } else {
            if(usermoney < 2000) return message.reply(`You Need Atleast $2000 In Your Wallet To Rob SomeOne`) // If User Money In Wallet Is Less Then 2000
            else if(mentionmoney < 0) return message.reply(`Mentioned User Doesnot Have Money In Wallet`) // If Mentioned User Money In Wallet Is 0
            else if(mentionmoney < 2000) return message.reply(`Mentioned User Should Have Atleast $2000 In Wallet To Rob`) // If Mentioned User Money In Wallet Is Less Then 2000
            else {
                if(final === 'Success') {
                    const amount = Math.floor(Math.random() * 1400) + 100 // Min Is 100 And Max Is 1500(100+1400)
                    const embed = new MessageEmbed()
                    .setAuthor(`${user.user.username} Robbed`, user.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setDescription(`
<@${user.id}> Robbed <@${mention.id}> And Got Away With **$${amount}**
                    `)
                    message.channel.send(embed)
                    db.add(`money_${user.id}`, amount) // Add Money To User's Wallet
                    db.subtract(`money_${mention.id}`, amount) // Substract Money From Mention(Robbed) User's Wallet
                    db.set(`robtime_${user.id}`, Date.now()) // Set CoolDown
                } else if(final === 'Failed') {
                    const embed1 = new MessageEmbed()
                    .setAuthor(`${user.user.username} Robbed`, user.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setDescription(`
<@${user.id}> Tried To Rob <@${mention.id}> But Failed
                    `)
                    message.channel.send(embed1)
                    db.set(`robtime_${user.id}`, Date.now()) // Set CoolDown
                } else if(final === 'Paid') {
                    const amount = Math.floor(Math.random() * 1400) + 100 // Min Is 100 And Max Is 1500(100+1400)
                    const embed2 = new MessageEmbed()
                    .setAuthor(`${user.user.username} Robbed`, user.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setDescription(`
<@${user.id}> Robbed <@${mention.id}> But Was Caught And Had To Pay **$${amount}** To <@${mention.id}>
                    `)
                    message.channel.send(embed2)
                    db.add(`money_${mention.id}`, amount) // Add Money Mentioned(Robbed) User's Wallet
                    db.subtract(`money_${user.id}`, amount) // Substract Money From User's Wallet
                    db.set(`robtime_${user.id}`, Date.now()) // Set CoolDown
                }
            }
        }
    }
}