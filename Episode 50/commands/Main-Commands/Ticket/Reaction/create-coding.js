const { MessageEmbed, MessageAttachment } = require("discord.js")
const db = require('quick.db')

module.exports = (client) => {
    client.on('messageReactionAdd', (reaction, user) => {
        if(reaction.message.channel.id === '810399317055373322' && reaction.emoji.name === '👨‍💻' && !user.bot) { // If Reaction Is Used In Message ID Provided // Emoji Should Be Same As Used In setup.js
            reaction.users.remove(user)

            reaction.message.guild.channels.create(`ticket-${user.username}`, {
                permissionOverwrites: [
                    { // For User Who Created Channel Using Reaction
                        id: user.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    },
                    { // For EveryOne In Server
                        id: reaction.message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },
                    { // For Mod, Admin etc... // Add As Many As You Like
                        id: '806411060911276042',
                        allow: ['SEND_MESSAGES','VIEW_CHANNEL','MANAGE_MESSAGES','MANAGE_CHANNELS'] //Add As Many As You Like
                    },
                    { // For Mod, Admin etc...
                        id: '806411060911276042',
                        allow: ['SEND_MESSAGES','VIEW_CHANNEL','MANAGE_MESSAGES','MANAGE_CHANNELS'] //Add As Many As You Like
                    }
                ],
                type : 'text', parent: '810399250336186398' // type:text For Text Channel and parent:810399250336186398 For In Which Category You Want the Ticket Channel To Be Created
            }).then(async channel => {
                db.set(`ticket-user_${channel.id}`, user.id)
                db.add(`ticket-user-total_${user.id}`, 1)
                channel.send(`<@${user.id}> Welcome!`, new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Welcome To Your Ticket')
                .setDescription(`
Please Provide Your Issues

React With ⛔ To Close Ticket
React With 🔒 To Lock Ticket
React With 🔓 To UnLock Ticket
React With 📃 To Get TranScript Of Ticket
                `)
                .setTimestamp()
                .setFooter(`Ticket For ${user.username}#${user.discriminator}`)
                ).then(message => {
                    message.react('⛔')
                    message.react('🔒')
                    message.react('🔓')
                    message.react('📃')
                })
            })
        }
        client.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch()
            if(reaction.partial) await reaction.fetch()
            if(user.bot) return // If Bot Reacts It Won't Work

            if(reaction.emoji.name === '⛔') {
                 // if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return reaction.message.channel.send('You Don\'t Have Permission To Close Ticket') // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                 if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                 else if(!reaction.message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
                else {
                    reaction.message.channel.send('Deleting Channel In 5 Seconds')
                    setTimeout(() => reaction.message.channel.delete(), 5000)
                    db.delete(`ticket-user_${reaction.message.channel.id}`)
                    db.add(`ticket-user-closed_${user.id}`, 1)
                }
            } else if(reaction.emoji.name === '🔒') {
                 // if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return reaction.message.channel.send('You Don\'t Have Permission To Close Ticket') // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                 if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                 else if(!reaction.message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
                else {
                    const memberinticket = db.fetch(`ticket-user_${reaction.message.channel.id}`)
                    reaction.message.channel.updateOverwrite(memberinticket, {
                        SEND_MESSAGES: false
                    })
                    // reaction.message.channel.send('Locked Ticket')
                }
            } else if(reaction.emoji.name === '🔓') {
                // if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return reaction.message.channel.send('You Don\'t Have Permission To Close Ticket') // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                if(!reaction.message.guild.members.cache.get(user.id).hasPermission('MANAGE_CHANNELS')) return // If User Who Reacted Doesn't Have MANAGE_CHANNELS Permission
                else if(!reaction.message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
                else {
                    const memberinticket = db.fetch(`ticket-user_${reaction.message.channel.id}`)
                    reaction.message.channel.updateOverwrite(memberinticket, {
                        SEND_MESSAGES: true
                    })
                    // reaction.message.channel.send('Locked Ticket')
                }
            } else if(reaction.emoji.name === '📃') {
                const { fetchMessage } = require('tech-tip-cyber') // Importing Package
                if(!reaction.message.channel.name.includes('ticket')) return // If Channel Isn't Ticket Channel, Won't Work
                else {
                    fetchMessage(reaction.message, 99).then((data) => { // fetchMessage(message, <10>) It Will Fetch 10 Messages From Channel, Can Be Any Number Less Than 100
                        const file = new MessageAttachment(data, "fetched.html"); // Making Attachment File
                        reaction.message.channel.send(file); // Send As Attachment
                        reaction.message.channel.send('Download And Open File To See Messages');
                    });
                }
            }
        })
    })
}