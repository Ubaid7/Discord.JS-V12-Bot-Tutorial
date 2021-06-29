const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['volume', 'vol'], // You Can Keep Any Name
    description: 'Change The Colume Of Music.', // Optional

    callback: (message, args) => {
        let title, number
        let argument = args.join(' ')
        const { channel } = message.member.voice
        if(!channel)  return message.reply('You need To Be In VC to Change Volume.') // If Member Isn't in VC
        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(!serverQueue) return message.reply('No Song Is Being Played.')
        if(!argument) { title = 'Current Volume'; number= serverQueue.volume } // If No Number is Provided BOT Will Send Current Volume
        else {
            let set = parseInt(argument)
            if(isNaN(set)) return message.reply('Volume Needs To Be A Number.') // If Volume Number Isn't Number
            else if(set > 100) return message.reply('Volume Cant Be Greater Then 100.') // If Volume Is Greater Than 100
            else if(set < 0) return message.reply('Volume Cant Be -ve') // If Volume Is -ve or Less Then 0
            serverQueue.volume = set
            serverQueue.connection.dispatcher.setVolumeLogarithmic(set / 100)
            title = 'Volume Set To'
            number = set
        }

        const embed = new MessageEmbed()
        .setTitle(title)
        .setColor('RANDOM')
        .setDescription(number)
        .addField('Volume Changed By:-', message.author)
        .setFooter('Volume')
        message.channel.send(embed)
    }
}