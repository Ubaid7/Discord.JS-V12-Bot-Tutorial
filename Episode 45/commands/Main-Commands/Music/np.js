const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['now-playing', 'np'], // You Can Keep Any Name
    decription: 'Show What Music Is Being Played', // Optional

    callback: (message, args) => {

        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(!serverQueue) return message.reply('No Song Is Being Played.')
        const q = serverQueue.songs[0] // To Check If Music Is Being Played.
        if(!q) return message.reply('No Music Is Being Played.')
        const duration = q.duration.split(':').reverse().reduce((prev, curr, i) => prev + curr * Math.pow(60, i), 0)
        const actualSeek = Math.floor((serverQueue.connection.dispatcher.streamTime - serverQueue.connection.dispatcher.pausedTime) / 1000) + 1;
        const seek = new Date(actualSeek * 1000).toISOString().substr(11, 8)
        const timeLeft = new Date((duration - actualSeek) * 1000).toISOString().substr(11, 8)
        let finalTotal 
        if(q.duration.lenght === 4) { finalTotal = "00:0" + q.duration}
        else { finalTotal = q.duration }

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Now Playing')
        .setURL(q.url)
        .setThumbnail(q.thumbnail)
        .addField(`${q.title}`, '<a:Next:803138566091309057>')
        .addField('Time Elapsed:-', seek)
        .addField('Time Left:-', timeLeft)
        .addField('Total Duration Of Song:-', finalTotal)
        .setTimestamp()
        .setFooter('Now Playing')
        message.channel.send(embed)

    }
} 