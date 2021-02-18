const Discord = require('discord.js');
const client = new Discord.Client();

client.queue = new Discord.Collection()

const { token } = require('./config.json')
const welcome = require('./commands/Mod/welcome');
const loadCommands = require('./commands/load-commands');
const suggest = require('./commands/Fun/suggest');
const create = require('./commands/Ticket/create');
const memberCount = require('./commands/Mod/member-count'); // Add This

client.once('ready', () => {
    console.log('Ready.')
    
    setInterval(() => {
        const statuses = [
            `Tech Tip Cyber Videos`,
            `YouTube Tutorial`,
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "WATCHING"}) // Can Be WATCHING, STREAMING, LISTENING
    }, 2000) // Second You Want to Change Status, This Cahnges Every 2 Seconds

    welcome(client)
    loadCommands(client)
    suggest(client)
    create(client)
    memberCount(client) // Add This
})

client.on('voiceStateUpdate', (old, New) => {
    if(old.id !== client.user.id) return
    if(old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.login(token)
