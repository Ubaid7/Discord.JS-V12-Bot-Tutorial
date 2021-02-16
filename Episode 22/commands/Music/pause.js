const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['pause', 'ps'], // You Can Keep Any Name
    description: 'Pause Currently Playing Music.', // Optional

    callback: (message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(serverQueue && serverQueue.playing) {
            serverQueue.playing = false
            serverQueue.connection.dispatcher.pause() // Pause Music

            // Lets Go For Embed Directly
            const embed = new MessageEmbed()
            .setTitle('Song Pause')
            .setDescription('Song Has Been Pause.')
            .addField('Paused By', message.author)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter('Song Paused')
            return message.channel.send(embed)
        }
        return message.reply('No Song Is Being Played, Can\'t Pause')
    }
}