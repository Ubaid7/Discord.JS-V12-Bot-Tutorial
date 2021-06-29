const { MessageEmbed, MessageAttachment } = require('discord.js')
const db = require('quick.db')
const { createCanvas, loadImage } = require('canvas')

module.exports = (client) => {
    client.on('message', async message => {
        const prefix = db.fetch(`prefix_${message.guild.id}`) // You Can Do `const prefix = '+'` Also
        xp(message)
        if (message.content.toLowerCase() === `${prefix}rank`) {
            const user = message.member || message.mentions.members.first()
            if (user.bot) return message.reply(`Bots Don't Have XP System, They to Serve You`)
            const level = db.fetch(`level_${message.guild.id}_${user.id}`)
            const currentXP = db.fetch(`xp_${message.guild.id}_${user.id}`)
            const XPneeded = level * 2 * 250 + 250 // Level 1 = 250, Level 2 = 750, Level 3 = 1750, Level 4.....

            // Rank Image
            let backgroundrank = db.fetch(`backgroundrank_${message.guild.id}`)
            if (!backgroundrank) {
                const firstbackgroundranklink = 'https://i.imgur.com/SpcEOfc.jpg'
                db.set(`backgroundrank_${message.guild.id}`, firstbackgroundranklink)
                message.reply(`Try Again, Was Loading Data And Image. Only 1 Time Process`)
                return
            }

            // Canvas
            const canvas = createCanvas(1000, 333) // Canvas Size
            const ctx = canvas.getContext('2d') // Making 2D
            let backgroundimage = await loadImage(backgroundrank)
            if (!backgroundimage || backgroundimage === null) {
                const firstbackgroundranklink = 'https://i.imgur.com/SpcEOfc.jpg'
                db.set(`backgroundrank_${message.guild.id}`, firstbackgroundranklink)
                message.reply(`Try Again, Was Loading Data And Image. Only 1 Time Process`)
                return
            }

            ctx.drawImage(backgroundimage, 0, 0, canvas.width, canvas.height) // For Making Image

            // Box For Name And Level
            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.strokeStyle = '#90EE90'
            ctx.globalAlpha = 0.2
            ctx.fillStyle = '#0390c8'
            ctx.fillRect(180, 216, 775, 65)
            ctx.fill()
            ctx.globalAlpha = 1
            ctx.strokeRect(180, 216, 775, 65)
            ctx.stroke

            // XP Bar With Fill
            ctx.fillStyle = '00FFFF'
            ctx.globalAlpha = 0.6
            ctx.fillRect(200, 216, ((100 / (level * 2 * 250 + 250)) * currentXP) * 7.5, 65) // Filling According To Users Level, Number Same As `const XPneeded`
            ctx.fill()
            ctx.globalAlpha = 1

            // Box For XP Bar
            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.fillStyle = '#00a9ec'
            ctx.strokeStyle = '#90EE90'
            ctx.globalAlpha = 0.2
            ctx.fillRect(300, 75, 650, 120)
            ctx.fill()
            ctx.globalAlpha = 1
            ctx.strokeRect(300, 75, 650, 120)
            ctx.stroke()

            // XP/XP Needed
            ctx.font = '35px sans-serif'
            ctx.textAlign = 'left'
            ctx.fillStyle = '#FF0000'
            ctx.fillText(`${currentXP} / ${XPneeded}`, 600, 260)

            // UserName
            ctx.font = '50px sans-serif'
            ctx.textAlign = 'left'
            ctx.fillStyle = '#00FFFF'
            ctx.fillText(user.user.username, 325, 155)

            // Level
            ctx.font = '40px sans-serif'
            ctx.fillStyle = '#ffa500'
            ctx.fillText('Level:', 760, 150)
            ctx.fillText(`${level}`, 875, 150)

            ctx.arc(170, 160, 120, 0, Math.PI * 2, true)
            ctx.lineWidth = 6
            ctx.strokeStyle = '00FFFF'
            ctx.stroke()
            ctx.closePath()
            ctx.clip()

            const avatar = await loadImage(user.user.displayAvatarURL({ format: 'jpg' }))
            ctx.drawImage(avatar, 40, 40, 250, 250)

            const attachment = new MessageAttachment(canvas.toBuffer(), 'rank.png')

            // Just Image
            message.channel.send(attachment)

            // With Embed

            const embed = new MessageEmbed()
                .setAuthor(`${user.user.username}'s Rank`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .addField('Level:', `${level}`)
                .addField('XP:', `${currentXP} / ${XPneeded}`)
                .setImage('attachment://rank.png')
                .attachFiles(attachment)
            message.channel.send(embed)
        }

        // Rank System
        function xp(message) {
            const prefix = db.fetch(`prefix_${message.guild.id}`) // You Can Do `const prefix = '+'` Also
            if (message.author.bot) return // No XP For Bots
            if (message.content === `${prefix}rank`) return // If Rank Command Is Used No XP Added
            const randomXP = Math.floor(Math.random() * 150) + 100 // Minimum = 100, Maximum = 250(100+150)
            db.add(`xp_${message.guild.id}_${message.author.id}`, randomXP)
            db.add(`xpTotal_${message.guild.id}_${message.author.id}`, randomXP)
            const level = db.fetch(`level_${message.guild.id}_${message.author.id}`)
            const XP = db.fetch(`xp_${message.guild.id}_${message.author.id}`)
            const XPneeded = level * 2 * 250 + 250 // Level 1 = 250, Level 2 = 750, Level 3 = 1750, Level 4.....

            // Send Level Up Message
            if (XPneeded < XP) {
                const newLevel = db.add(`level_${message.guild.id}_${message.author.id}`, 1)
                const levelupchannel = db.fetch(`levelupchannel_${message.guild.id}`)
                db.subtract(`xp_${message.guild.id}_${message.author.id}`, XPneeded)
                const channel = message.guild.channels.cache.get(levelupchannel)
                if (channel) {
                    channel.send(`${message.author}, You Have Leveled Up To **${newLevel}**`)
                } else {
                    return message.channel.send(`${message.author}, You Have Leveled Up To **${newLevel}**`)
                }
            }
        }
    })
}
