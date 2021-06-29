const Discord = require('discord.js');
const client = new Discord.Client({partials: ['MESSAGE', 'USER', 'REACTION']});
const { MessageButton } = require('discord-buttons')(client);
const db = require('quick.db')

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
const createcommon = require('./commands/Main-Commands/Ticket/Reaction/create-common')
const createcoding = require('./commands/Main-Commands/Ticket/Reaction/create-coding')
const creategiveaway = require('./commands/Main-Commands/Ticket/Reaction/create-giveaway');
const botJoinLeaveLogs = require('./commands/Per-Server-Commands/Other/bot-join-leave-logs');
const joinMessage = require('./commands/Per-Server-Commands/Other/join-message');
const start = require('./commands/Main-Commands/GiveAways/start');
const edit = require('./commands/Main-Commands/GiveAways/edit');
const end = require('./commands/Main-Commands/GiveAways/end');
const reRoll = require('./commands/Main-Commands/GiveAways/re-roll');
const _delete = require('./commands/Main-Commands/GiveAways/delete');
const rank = require('./commands/Main-Commands/Rank/rank');

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
    createcommon(client)
    createcoding(client)
    creategiveaway(client)
    botJoinLeaveLogs(client)
    joinMessage(client)
    start(client)
    edit(client)
    end(client)
    reRoll(client)
    _delete(client)
    rank(client)
})

client.on('voiceStateUpdate', (old, New) => {
    if(old.id !== client.user.id) return
    if(old.channelID && !New.channelID) client.queue.delete(old.guild.id)
})

client.on('clickButton', async (button) => {
    // For All Buttons With ID 'button1', This Will Happen When User Clicks It
    if (button.id === 'button1') {
        // Button
        const button1 = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('Join')
        .setURL('https://discord.gg/2FMvpaUcWh')
    
        // Embed
        const embed1 = new Discord.MessageEmbed()
        .setAuthor(`Clicked Button 1`)
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
New Discord Buttons!
You Clicked Button 1, Now Join Discord Server
        `)

    button.channel.send(`Clicked Button 1`, { button: button1, embed: embed1 }); // Send Embed And Button When User Click Button With ID 'button1'
    // button.message.edit(`Clicked Button 1`, { button: button1, embed: embed1 }); // You Can Edit Old Message Instead Of Deleting It
    // button.message.delete(); // Or Delete Message And Do Nothing
    }

    // For All Buttons With ID 'button2', This Will Happen When User Clicks It
    if (button.id === 'button2') {
        // Button
        const button2 = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('Github')
        .setURL('https://github.com/Ubaid7')
        
        // Embed
        const embed2 = new Discord.MessageEmbed()
        .setAuthor(`Clicked Button 2`)
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
New Discord Buttons!
You Clicked Button 2, Now See GithUb
        `)

    button.channel.send(`Clicked Button 2`, { button: button2, embed: embed2 }); // Send Embed And Button When User Click Button With ID 'button2'
    // button.message.edit(`Clicked Button 1`, { button: button2, embed: embed1 }); // You Can Edit Old Message Instead Of Deleting It
    // button.message.delete(); // Or Delete Message And Do Nothing
    }

    // For All Buttons With ID 'button4', This Will Happen When User Clicks It
    if (button.id === 'button4') {
        // Button
        const button4 = new disbut.MessageButton()
        .setStyle('url')
        .setLabel('YouTube')
        .setURL('https://www.youtube.com/techtipcyber/videos')

        // Embed
        const embed4 = new Discord.MessageEmbed()
        .setAuthor(`Clicked Button 3`)
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
New Discord Buttons!
You Clicked Button 3, Now See YouTube
        `)

    button.channel.send(`Clicked Button 3`, { button: button4, embed: embed4 }); // Send Embed And Button When User Click Button With ID 'button4'
    // button.message.edit(`Clicked Button 1`, { button: button4, embed: embed1 }); // You Can Edit Old Message Instead Of Deleting It
    // button.message.delete(); // Or Delete Message And Do Nothing
    }

})

client.login(token)
