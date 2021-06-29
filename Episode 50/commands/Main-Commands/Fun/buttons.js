const { MessageEmbed } = require('discord.js') // Make Sure You Have Latest Version Of discord.js
const disbut = require('discord-buttons') // npm i discord-buttons

module.exports = {
    commands: ['button', 'buttons'], // You Can Keep Any Name
    description: 'New Discord Buttons', // Optional

    callback: async(message, args, client) => {

        // Sending Embed
        const embed1 = new MessageEmbed()
        .setAuthor(`${message.author.username} Used Buttons`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RANDOM')
        .setDescription(`
New Discord Buttons!
Click On Each For More Info
        `)
        
        // You Can Send 5 Buttons Per Message
        // I Have Commented Disabled Buttons, You Can Remove Comment And Use It
        
        // First Button(WithOut Disabled)
        const button1 = new disbut.MessageButton()
        .setID('button1') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
        .setLabel('Button 1') // Label Of Button, i.e: Description
        .setStyle('red') // Style Of Button, Their Are 5 Styles Currently
        // .setDisabled() // Disabled, We Can't Click Button

        // Second Button(WithOut Disabled)
        const button2 = new disbut.MessageButton()
        .setID('button2') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
        .setLabel('Button 2') // Label Of Button, i.e: Description
        .setStyle('green') // Style Of Button, Their Are 5 Styles Currently
        // .setDisabled() // Disabled, We Can't Click Button

        // First Button(With Disabled)
        // const button11 = new disbut.MessageButton()
        // .setID('button11') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
        // .setLabel('Button 1-1') // Label Of Button, i.e: Description
        // .setStyle('red') // Style Of Button, Their Are 5 Styles Currently
        // .setDisabled() // Disabled, We Can't Click Button
        
        // Second Button(With Disabled)
        // const button22 = new disbut.MessageButton()
        // .setID('button22') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
        // .setLabel('Button 2-1') // Label Of Button, i.e: Description
        // .setStyle('green') // Style Of Button, Their Are 5 Styles Currently
        // .setDisabled() // Disabled, We Can't Click Button
        
        // Third Button(WithOut Disabled)
        const button3 = new disbut.MessageButton()        
        .setLabel('Button 3 - Subscribe') // Label Of Button, i.e: Description
        .setStyle('url') // Style Of Button, Their Are 5 Styles Currently
        .setURL('https://youtube.com/techtipcyber')
        // .setDisabled() // Disabled, We Can't Click Button
        
        // Third Button(With Disabled)
        // const button33 = new disbut.MessageButton()
        // .setLabel('Button 3-1 - Subscribe') // Label Of Button, i.e: Description
        // .setStyle('url') // Style Of Button, Their Are 5 Styles Currently
        // .setURL('https://youtube.com/techtipcyber')
        // .setDisabled() // Disabled, We Can't Click Button

        // Fourth Button(WithOut Disabled)
        const button4 = new disbut.MessageButton()
        .setID('button4') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
        .setLabel('Button 4') // Label Of Button, i.e: Description
        .setStyle('blurple') // Style Of Button, Their Are 5 Styles Currently
        // .setDisabled() // Disabled, We Can't Click Button
        
        // Fourth Button(With Disabled)
        // const button44 = new disbut.MessageButton()
        // .setID('button44') // ID Of Button So We Can Do WhatEver We Want To When User Clicks It
        // .setLabel('Button 4-1') // Label Of Button, i.e: Description
        // .setStyle('blurple') // Style Of Button, Their Are 5 Styles Currently
        // .setDisabled() // Disabled, We Can't Click Button

        // Sending Buttons And Embed
        message.channel.send('Buttons', {
            buttons: [
                button1, button2, button3, button4
            ],
            embed: embed1
        })
    }
}