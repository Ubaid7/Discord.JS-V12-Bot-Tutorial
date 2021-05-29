const { MessageAttachment } = require('discord.js') // Importing discord.js Package For Sending As Attachment
const { fetchMessage } = require('tech-tip-cyber') // Importing Package

module.exports = {
    commands: ['transcrip-ticket', 'ticket-transcrip', 'tt'], // You Can Keep Any Name
    description: 'Get Ticket TranScript', // Optional

    callback: (message, args) =>{
        fetchMessage(message, 99).then((data) => { // fetchMessage(message, <10>) It Will Fetch 10 Messages From Channel, Can Be Any Number Less Than 100
            const file = new MessageAttachment(data, "fetched.html"); // Making Attachment File
            message.channel.send(file); // Send As Attachment
            message.channel.send('Download And Open File To See Messages');
        });
    }
}