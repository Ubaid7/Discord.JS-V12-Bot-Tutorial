const Discord = require('discord.js');
const client = new Discord.Client({partials: ['MESSAGE', 'USER', 'REACTION']});

client.queue = new Discord.Collection()  

const { token } = require('./config.json')
const welcome = require('./commands/Mod/welcome'); // Add This
const loadCommands = require('./commands/load-commands');
const suggest = require('./commands/Fun/suggest');
const create = require('./commands/Ticket/create');
const memberCount = require('./commands/Mod/member-count');
const EditMessage = require('./utils/EditMessage');
const setup = require('./commands/Reaction-Roles/setup');
const reactRoles = require('./commands/Reaction-Roles/react-roles');

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

    welcome(client) // Add This
    loadCommands(client)
    suggest(client)
    create(client)
    memberCount(client)
    EditMessage(client)
    setup(client)
    reactRoles(client)
})

client.on('voiceStateUpdate', (old, New) => {
    if(old.id !== client.user.id) return
    if(old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.login(token)
