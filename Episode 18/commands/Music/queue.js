const { MessageEmbed, guild } = require("discord.js")

module.exports = {
    commands: ['queue', 'q'], // You Can Keep Any Name
    description: 'Shows Queue Of Music.', // Optional

    callback: (message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(!serverQueue) return message.reply('There Is No Music Being Played, Cant Show Queue.') // If No Music Is Being Played or BOT Isn't In VC.

        const q = serverQueue.songs

        const embed = new MessageEmbed()
        .setTitle('Queue')
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter('Song Queue')
        for (var key in q) { embed.addFields({ name: '\u200b' + `${parseInt(key) + 1}` + ') ' +q[key].title,
    value: '<a:Next:803138566091309057>' }) }
    message.channel.send(embed)
    }
}