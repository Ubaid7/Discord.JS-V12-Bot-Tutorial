const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['skip', 'sk'], // You Can Keep Any Name
    description: 'Skips The Music', // Optional

    callback: async(message, args) => {
        const channel = message.member.voice // VC Of User
        const queue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(!channel) return message.reply('You need To be In A VC To Skip Music.')
        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(!serverQueue) return message.reply('No Song Being Played, Cant Skip.') // If No Song Is Being Played.
        if(queue.repeatMode === 1) { queue.repeatMode = 0 }
        serverQueue.connection.dispatcher.end('Song Skipped.')
        // message.channel.send('Song Skipped.')

        const embed = new MessageEmbed()
        .setTitle('Music Skipped')
        .setDescription('Music Has Been Skipped.')
        .addField('Skipped By:-', message.author)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter('Song Skipped')
        message.channel.send(embed)
    }
}