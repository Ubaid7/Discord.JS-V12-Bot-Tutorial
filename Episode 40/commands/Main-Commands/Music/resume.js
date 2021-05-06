const { MessageEmbed } = require("discord.js");

module.exports = {
    commands: ['resume', 'r'], // You Can Keep Any Name
    description: 'Resumes A Paused Music', // Optional

    callback: (message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(serverQueue && !serverQueue.playing) {
            serverQueue.playing = true
            serverQueue.connection.dispatcher.resume() // Resumes Music

            const embed = new MessageEmbed()
            .setTitle('Song Resumed')
            .setDescription('Song Has Been Resumed.')
            .addField('Resumed By:-', message.author)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter('Song Resumed')
            return message.channel.send(embed)
        }
        else if (serverQueue.playing) return message.reply('Song Isn\'t Pause, Cant Resume.')
    }
}