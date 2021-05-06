const Discord = require('discord.js');
const client = new Discord.Client({partials: ['MESSAGE', 'USER', 'REACTION']});

client.queue = new Discord.Collection()  

const { token } = require('./config.json')
const welcome = require('./commands/Main-Commands/Mod/welcome');
const loadCommands = require('./commands/load-commands');
const suggest = require('./commands/Main-Commands/Fun/suggest');
const memberCount = require('./commands/Main-Commands/Mod/member-count');
const EditMessage = require('./utils/EditMessage');
const setup = require('./commands/Main-Commands/Reaction-Roles/setup');
const reactRoles = require('./commands/Main-Commands/Reaction-Roles/react-roles');
const cahtbot = require('./commands/Main-Commands/Fun/chatbot');
const lb = require('./commands/Main-Commands/Economy/lb');
const uptime = require('./commands/Main-Commands/Info/uptime');
const botInfo = require('./commands/Main-Commands/Info/bot-info');
const createcommon = require('./commands/Main-Commands/Ticket/Reaction/create-common') // Add This
const createcoding = require('./commands/Main-Commands/Ticket/Reaction/create-coding') // Add This
const creategiveaway = require('./commands/Main-Commands/Ticket/Reaction/create-giveaway') // Add This

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
    memberCount(client)
    EditMessage(client)
    setup(client)
    reactRoles(client)
    cahtbot(client)
    lb(client)
    uptime(client)
    botInfo(client)
    createcommon(client) // Add This
    createcoding(client) // Add This
    creategiveaway(client) // Add This
})

client.on('voiceStateUpdate', (old, New) => {
    if(old.id !== client.user.id) return
    if(old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.login(token)
