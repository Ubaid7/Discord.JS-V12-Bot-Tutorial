const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
    const suggestinChannel = client.channels.cache.get('810232083372441640') // Channel For Suggestion
    client.on('message', message => {
        if(message.channel === suggestinChannel) {
            if(message.author.bot) return // Doesnot Delete BOTs Messages
            message.delete() // Delete Original Message Sent By User

            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
            .setDescription(`${message.content}`)
            .setFooter('Want To Suggest Something? Type In This Channel.')
            message.channel.send(embed).then(message => { // Reactions
                message.react('<a:YesAA:810231460975869963>') // Change Emoji
                message.react('<a:NoAA:810231506475548672>') // Change Emoji
            })
        }
    })
}