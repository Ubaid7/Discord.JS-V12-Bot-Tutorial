const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready.')
})

client.on('message', message => {
	console.log(message.content); //If You Dont Want The Messages In Console Then Remove This Line, This Will Log Messages In Console
  
  if (message.content === 'ping') {
	message.channel.send('Pong!'); //message.reply('Pong!'); Also If You Want The BOT To Ping The Person Who Used The Command
} 
  if (message.content === 'youtube') {
	message.channel.send('https://youtube.com/techtipcyber'); //message.reply('https://youtube.com/techtipcyber'); Also If You Want The BOT To Ping The Person Who Used The Command
} 

});
