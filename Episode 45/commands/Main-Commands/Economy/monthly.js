const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db
const ms = require('parse-ms') // npm i parse-ms

module.exports = {
    commands: ['monthly'], // You Can Keep Any Name
    description: 'Get Your Monthly $', // Optional

    callback: (message, args) => {

        const user = message.member
        const timeout = 2629800000  // 2629800000 = 1 Month
        const amount = Math.floor(Math.random() * 20000) + 100000 // Min Is 100,000 And Max Is 120,000(100000+20000)
        const monthlytime = db.fetch(`monthlytime_${user.id}`) // Same As balance.js

        if(monthlytime !== null && timeout - (Date.now() - monthlytime) > 0) { // Check For CoolDown
            const timeleft = ms(timeout - (Date.now() - monthlytime))

            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Monthly Reward`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
Already Claimed Monthly Coins, Claim Again In **${timeleft.days} Days ${timeleft.hours} Hours ${timeleft.minutes} Minutes ${timeleft.seconds} Seconds**
Default CoolDown Is **1 Week(7 Day)**
            `)
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Monthly Reward`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
<@${user.id}> Claimed **$${amount.toLocaleString()}** As Monthly Reward
            `)
            message.channel.send(embed)
            db.add(`money_${user.id}`, amount) // Add Amount To User's Wallet
            db.set(`monthlytime_${user.id}`, Date.now()) // Set Time When Command Was Used
        }
    }
}