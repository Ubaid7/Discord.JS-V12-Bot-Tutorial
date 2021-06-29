const { MessageEmbed } = require('discord.js')
const { YTDate, YTDescription, YTSub, YTVideo, YTView, YTThumbNail } = require('tech-tip-cyber') // npm i tech-tip-cyber@latest

module.exports = {
    commands: ['youtube-stat-npm', 'youtube-stats-npm', 'yt-stats-npm', 'yt-stat-npm'], // You Can Keep Any Name
    description: 'Get Stats For YouTube Channel', // Optional

    callback: async(message, args, client) => {

        const channelName = args.join(' ') // Channel Name
        if(!channelName) return message.reply(`Which Channel Stats You Need?`) // If No Channel Name Is Provided

        YTDate({ YTChannel: channelName }).then(date => {
            YTDescription({ YTChannel: channelName }).then(desc => {
                YTSub({ YTChannel: channelName }).then(sub => {
                    YTVideo({ YTChannel: channelName }).then(video => {
                        YTView({ YTChannel: channelName }).then(view => {
                            YTThumbNail({ YTChannel: channelName }).then(thum => {
                                const embed = new MessageEmbed()
                                .setAuthor(`${channelName} Stats`, thum)
                                .setTimestamp()
                                .setThumbnail(thum)
                                .setColor('RANDOM')
                                .addField(`Description:`, desc)
                                .addField(`Subscribers:`, sub, true)
                                .addField(`Total Views:`, view, true)
                                .addField(`Total Videos:`, video, true)
                                .addField(`Channel Created:`, new Date(date), true)
                                .setFooter(`Requested By ${message.author.username}`)
                                message.channel.send(embed)
                            })
                        })
                    })
                })
            })
        })

    }
}