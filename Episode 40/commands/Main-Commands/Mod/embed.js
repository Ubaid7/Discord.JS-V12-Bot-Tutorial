const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['embed', 'create-embed'] ,
    permissions: ['MANAGE_MESSAGES'],
    permissionError: 'You Cant Use This Command',
    description: 'Creates An Embed For You With Out Code',
    usage: '+embed #Channel-Name ^Title^Description^Footer^Color^Thumbnail^Link^Image-Link',

    callback: (message, args, text) => {

        // Send Message In Channel You Want To 
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Provide A Channel To Send Embed') // If No Channel Is Provided

        // Embed Options
        const title = text.split('^')[1] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!title) return message.reply('Provide Title For Embed.') // If No Title Is Provided
        const description = text.split('^')[2] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!description) return message.reply('Provide Description For Embed.') // If No Description Is Provided
        const footer = text.split('^')[3] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!footer) return message.reply('Provide Footer For Embed.') // If No Footer Is Provided
        const color = text.split('^')[4] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!color) return message.reply('Provide Color For Embed.') // If No Color Is Provided
        const thu = text.split('^')[5] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!thu) return message.reply('Provide Thumbnail For Embed.') // If No Thumbnail Is Provided
        const image = text.split('^')[6] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!image) return message.reply('Provide Image For Embed.') // If No Image Is Provided

        const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setFooter(footer)
        .setImage(image)
        .setThumbnail(thu)
        channel.send(embed)
    }
}