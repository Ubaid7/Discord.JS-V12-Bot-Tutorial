const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['stop', 's'], // You Can Keep Any Name
    description: 'Stops Music And Leaves VC.', // Optional

    callback: (message, args) => {
        const channel = message.member.voice // VC Of User
        const myChannel = message.guild.me.voice.channel // VC Of BOT
        if(!channel) return message.reply('You need To be In VC To Stop Music.') // If User Isn't In VC.
        const serverQueue = message.client.queue.get(message.guild.id) // To Check If Music Is Being Played.
        if(!serverQueue && !myChannel) return message.reply('There Is No Music, Cant Stop.') // If No Music Is Being Played or BOT Isn't In VC.
        message.client.queue.delete(message.guild.id) // Deletes the Queue or Stops The Music
        myChannel.leave() // Leaves The VC
        // message.reply('Music has Been Stopped, Leaving VC.')
        // OR
        const embed = new MessageEmbed()
        .setTitle('Music Stopped')
        .setDescription('Music Has Been Stopped. Leaving VC.')
        .addField('Stopped By:-', message.author)
        .setTimestamp()
        .setColor('RANDOM')
        .setFooter('Song Stopped')
        message.channel.send(embed)
    }
}