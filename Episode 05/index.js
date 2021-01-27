const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./config.json')
const welcome = require('./commands/welcome');
const loadCommands = require('./commands/load-commands'); // Add This


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
    loadCommands(client) // Add This
})

client.login(token)
