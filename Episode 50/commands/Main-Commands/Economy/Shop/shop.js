const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db

module.exports = {
    commands: ['shop'], // You Can Keep Any Name
    description: 'See Items In Shops', // Optional

    callback: async(message, args, client) => {

        const prefix = db.fetch(`prefix_${message.guild.id}`)

        const embed = new MessageEmbed()
        .setAuthor('Shop')
        .setTimestamp()
        .setColor('RANDOM')
        .addField('Laptop:', `Price:- \`$10,000\`\nUse Laptop To Post Meme And More\nUsage:- \`${prefix}buy laptop\``)
        .addField('Laptop:', `Price:- \`$15,000\`\nUse Fish Rod To Fish\nUsage:- \`${prefix}buy fish rod\``)
        .setFooter('Shop')
        message.channel.send(embed)
    }
}
