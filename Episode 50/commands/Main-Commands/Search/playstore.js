const { MessageEmbed } = require('discord.js')
const PlayStore = require('google-play-scraper') // npm i google-play-scraper

module.exports = {
    commands: ['playstore', 'play-store'], // You Can Keep Any Name
    description: 'Search For App On PlayStore And Gets Its Info', // Optional

    callback: async(message, args, client) => {

        const appname = args.join(' ') // Name Of App
        if(!appname) return message.reply(`Which Apps Info You Need?`) // If No App Name Is Provided

        PlayStore.search({ // Search It Using Package
            term: args.join(' '), // App Name
            num: 1, // Number Of Results
        }).then((data) => {
            let AppInfo

            try {
                AppInfo = JSON.parse(JSON.stringify(data[0])) // Get Info Of App
            } catch (error) {
                return message.reply(`No App With Name **${appname}** Found`)
            }

            const embed = new MessageEmbed()
            .setTitle(AppInfo.title)
            .setThumbnail(AppInfo.icon)
            .setURL(AppInfo.url)
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(AppInfo.summary)
            .addField(`Price:`, AppInfo.priceText)
            .addField(`Developer:`, AppInfo.developer)
            .addField(`Rating:`, AppInfo.scoreText)
            .setFooter(`Requested By ${message.author.username}`)
            message.channel.send(embed)
        })
    }
}