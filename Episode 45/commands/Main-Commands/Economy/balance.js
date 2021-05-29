const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db

module.exports = {
    commands: ['balance', 'bal'], // You Can Keep Any Name
    description: 'Check Your Balance', // Optional

    callback: (message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member

        let bal = db.fetch(`money_${user.id}`) // You Can Keep `money_${message.guild.id}_${user.id}` If You Want Different Amount In, Eg:- If I Am In 2 Servers And You Keep `money_${user.id}` I Will Have Same Money In Both Servers But If you Keep `money_${message.guild.id}_${user.id}` Then I Will Have Different Amount In Both Servers
        if(bal === null) bal = '0' // If No Money In Wallet

        let bank = db.fetch(`bank_${user.id}`) // You Can Keep `bank_${message.guild.id}_${user.id}` If You Want Different Amount In, Eg:- If I Am In 2 Servers And You Keep `bank_${user.id}` I Will Have Same Money In Both Servers But If you Keep `bank_${message.guild.id}_${user.id}` Then I Will Have Different Amount In Both Servers
        if(bank === null) bank = '0' // If No Money In Bank

        const embed = new MessageEmbed()
        .setAuthor(`${user.user.username} Balance`, user.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
💸 Wallet:- **$${bal.toLocaleString()}**
🏦 Bank:- **$${bank.toLocaleString()}**
        `)
        message.channel.send(embed)
    } // Keep Any Money Symbol, I kept $ Because Its Easy To Write Here
}