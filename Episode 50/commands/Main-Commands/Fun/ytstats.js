const { MessageEmbed } = require('discord.js')
const config = require('../../../config.json')
const fetch = require('node-superfetch') // npm i node-superfetch

module.exports = {
    commands: ['youtube-stat', 'youtube-stats', 'yt-stats', 'yt-stat'], // You Can Keep Any Name
    description: 'Get Stats For YouTube Channel', // Optional

    callback: async(message, args, client) => {

        const channelName = args.join(' ') // Channel Name
        if(!channelName) return message.reply(`Which Channel Stats You Need?`) // If No Channel Name Is Provided

        try{
            const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&key=${config.ytapi}&maxrESULTS=1&type=channel`)

            const data = await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${config.ytapi}`)

            const embed = new MessageEmbed()
            .setAuthor(`${channelName} Stats`, channel.body.items[0].snippet.thumbnails.high.url)
            .setTimestamp()
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .setColor('RANDOM')
            .addField(`Name:`, channel.body.items[0].snippet.channelTitle, true)
            .addField(`Description:`, channel.body.items[0].snippet.description)
            .addField(`Subscribers:`, parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
            .addField(`Total Views:`, parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
            .addField(`Total Videos:`, parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
            .addField(`Channel Created:`, new Date(channel.body.items[0].snippet.publishedAt), true)
            .addField(`Link:`, `[${channel.body.items[0].snippet.channelTitle}](https://youtube.com/channels/${channel.body.items[0].id.channelId})`)
            .setFooter(`Requested By ${message.author.username}`)
            message.channel.send(embed)            
        } catch (err) {
            const channel = await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&key=${config.ytapi}&maxrESULTS=1&type=channel`)
            message.reply(`UnKnown Channel/Data Error`)
            if(!channel.body.items[0]) return message.reply(`No Channel With **${channelName}** Found`)
        }

    }
}