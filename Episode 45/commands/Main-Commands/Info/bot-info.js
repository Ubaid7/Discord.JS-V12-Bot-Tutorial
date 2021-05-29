const { MessageEmbed } = require('discord.js')
const os = require('os') // npm i os
const ms = require('ms') // npm i ms
const moment = require('moment') // npm i moment
const cpuStat = require('cpu-stat') // npm i cpu-stat
const db = require('quick.db') // npm i quick.db // Optional

module.exports = (client) => {
    client.on('message', message => {
        const prefix = db.fetch(`prefix_${message.guild.id}`) // Or Just Do const { prefix } = require('../../../config.json')
        if(message.content.toLowerCase() === `${prefix}bot-info` || message.content.toLowerCase() === `${prefix}bi`) {

            // For Status Of Bot
            const status = {
                online: '🟢:- Online',
                idle: '🟡:- Idle',
                dnd: '🔴:- DND',
                offline: '⚫:- Offline'
            }
            // UpTime Of Bot
            const days = Math.floor(client.uptime / 86400000)
            const hours = Math.floor(client.uptime / 3600000) % 24 // 1 Day = 24 Hours
            const minutes = Math.floor(client.uptime / 60000) % 60 // 1 Hour = 60 Minutes
            const seconds = Math.floor(client.uptime / 1000) % 60 // 1 Minute = 60 Seconds

            // Other Stats
            cpuStat.usagePercent(function(error, percent) {
                if(error) return message.reply(error)
                const memoryusage = formatBytes(process.memoryUsage().heapUsed) // Memory Usage
                const node = process.version // NodeJS Version
                const CPU = percent.toFixed(2) // CPU Usage
                const CPUModel = os.cpus()[0].model // PC Model
                const cores = os.cpus().length // Cores

                const embed = new MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('RANDOM')
                .addField('Name', client.user.username, true)
                .addField('ID', client.user.id, true)
                .addField('Status', `${status[client.presence.status]}`)
                .addField('Craeted At', moment.utc(client.user.createdAt).format('LLLL'))
                .addField('Added To Server', moment.utc(client.joinedAt).format('LLLL'))
                .addField('Servers', client.guilds.cache.size, true)
                .addField('Members In All Server', client.users.cache.size, true)
                .addField('Channels In All Server', client.channels.cache.size.toLocaleString())
                .addField('UpTime', `\`${days}\` Days \`${hours}\` Hours \`${minutes}\` Minutes \`${seconds}\` Seconds`)
                .addField('Node Verison', node, true)
                .addField('Memery Usage', memoryusage, true)
                .addField('CPU USage', `${CPU}%`, true)
                .addField('CPU Model', CPUModel)
                .addField('Cores', cores, true)
                message.channel.send(embed)
            })

            // For Memory In MB, GB....
            function formatBytes(a, b) {
                let c = 1024 // 1 GB = 1024 MB
                d = b || 2
                e = ['B', 'KB', 'MB', 'GB', 'TB']
                f = Math.floor(Math.log(a) / Math.log(c))

                return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
            }
        }
    })
}