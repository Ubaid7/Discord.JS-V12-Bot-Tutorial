const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = (client) => {
    client.on('message', message => {
        const prefix = db.fetch(`prefix_${message.guild.id}`) // For Using Command
        if(message.content.toLowerCase() === `${prefix}rich` || message.content.toLowerCase() === `${prefix}lb` || message.content.toLowerCase() === `${prefix}leaderboard`) {
            let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data) // Get Users Money(Wallet), You Can Change To Bank
            money.length = 10 // Top 10
            var finalLb = ""
            for(var i in money) {
                finalLb += `**${money.indexOf(money[i])+1})** ${client.users.cache.get(money[i].ID.slice(6)).tag} :- \`$${money[i].data.toLocaleString()}\`\n` // 6 Because `money_` Is 5 Digit and 6th Digit Is User ID
            }

            // Sending As Embed
            const embed = new MessageEmbed()
            .setAuthor(`Global LeaderBoard`, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
${finalLb}
            `)
            message.channel.send(embed)
        }
    })
}