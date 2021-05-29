const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db
const ms = require('parse-ms') // npm i parse-ms

module.exports = {
    commands: ['weekly'], // You Can Keep Any Name
    description: 'Get Your Weekly $', // Optional

    callback: (message, args) => {

        const user = message.member
        const timeout = 604800000  // 604800000 = 1 Week
        const amount = Math.floor(Math.random() * 20000) + 10000 // Min Is 10,000 And Max Is 30,000(10000+20000)
        const weeklytime = db.fetch(`weeklytime_${user.id}`) // Same As balance.js

        if(weeklytime !== null && timeout - (Date.now() - weeklytime) > 0) { // Check For CoolDown
            const timeleft = ms(timeout - (Date.now() - weeklytime))

            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Weekly Reward`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
Already Claimed Weekly Coins, Claim Again In **${timeleft.days} Days ${timeleft.hours} Hours ${timeleft.minutes} Minutes ${timeleft.seconds} Seconds**
Default CoolDown Is **1 Week(7 Day)**
            `)
            message.channel.send(embed)
        } else {
            const embed = new MessageEmbed()
            .setAuthor(`${user.user.username} Weekly Reward`, user.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
<@${user.id}> Claimed **$${amount.toLocaleString()}** As Weekly Reward
            `)
            message.channel.send(embed)
            db.add(`money_${user.id}`, amount) // Add Amount To User's Wallet
            db.set(`weeklytime_${user.id}`, Date.now()) // Set Time When Command Was Used
        }
    }
}