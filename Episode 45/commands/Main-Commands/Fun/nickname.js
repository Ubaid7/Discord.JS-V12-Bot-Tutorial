const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // npm i quick.db
const ms = require('parse-ms') // npm i parse-ms

module.exports = {
    commands: ['nickname', 'nick'], // You Can Keep Any Name
    description: 'Change NickName', // Optional

    callback: async(message, args, client) => {

        const prefix = db.fetch(`prefix_${message.guild.id}`)
        const member = message.member

        const timeout = 3600000 // 1 Hour In MiliSecond // For CoolDown
        const nametime = db.fetch(`name-time_${message.guild.id}_${member.id}`)

        if(nametime !== null && timeout - (Date.now() - nametime) > 0) { // CoolDown
            const timeleft = ms(timeout - (Date.now() - nametime))

            const embed = new MessageEmbed()
            .setAuthor(`${member.user.username} Begged`, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
Don't Change NickName So Fast, Beg Again In **${timeleft.hours} Hour ${timeleft.minutes} Minutes ${timeleft.seconds} Seconds**
Default CoolDown Is **1 Hour**
            `)
            message.channel.send(embed)
        } else { // Code
            const name = args.join(' ') // For NickName
            if(!name) return message.reply(`What NickName You Do Want To Keep?`) // If No NickName Provided

            if(name.length > 32) return message.reply(`Your Name Can't Be Longer Than 32 Words`) // If Name Is Longer Then 32 Words // Discord Rules
            if(name.length < 2) return message.reply(`You Name Can't Be Shorter Than 2 Words`) // If Name Is Shorter Then 2 Words

            const embed = new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
    <@${member.user.id}> Wants To Change NickName To **${name}**

    React With <a:YesAA:810231460975869963> To Change Name
    React With <a:NoAA:810231506475548672> To Cancel Request
            `)
            message.channel.send(embed).then(message => {
                message.react('<a:YesAA:810231460975869963>') // React To Embed With Yes // Change Emoji
                message.react('<a:NoAA:810231506475548672>') // React To Embed With No // Change Emoji
                db.set(`name-time_${message.guild.id}_${member.id}`, Date.now())

                const filter = (reaction, user) => ['YesAA','NoAA'].includes(reaction.emoji.name) && user.id === member.id // Check If User Who Reacted To Emoji(Yes/No) is The Same As Who Used Command
                const collector = message.createReactionCollector(filter)

                collector.on('collect', async r => {
                    switch (r.emoji.name) {
                        case 'YesAA': // If User Reacted With Yes
                            member.setNickname(name)
                            message.channel.send(`Successfully Changed NickName To **${name}**`)
                            db.set(`name-time_${message.guild.id}_${member.id}`, Date.now())
                            collector.stop()
                            break;
                            case 'NoAA': // If User Reacted With No
                                message.channel.send('Request Cancelled')
                                db.set(`name-time_${message.guild.id}_${member.id}`, Date.now())
                    }
                })
            })
        }
    }
}