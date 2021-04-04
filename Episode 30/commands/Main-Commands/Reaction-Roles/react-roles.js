module.exports = (client) => {

    // Adding Roles When Reacted
    client.on('messageReactionAdd', async(reaction, user) => {

        const reactionrole = '811317702064340992' // Message ID For Reaction Roles

        if(reaction.message.id === reactionrole && reaction.emoji.name === 'Yt') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('811328860414541884')
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'GitHub') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('811328963049553931')
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'VS') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('811328908468420628')
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'WikiPedia') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('811328887120199720')
        }
    })

    // Removing Roles When Reacted
    client.on('messageReactionRemove', async(reaction, user) => {

        const reactionrole = '811317702064340992' // Message ID For Reaction Roles

        if(reaction.message.id === reactionrole && reaction.emoji.name === 'Yt') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('811328860414541884')
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'GitHub') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('811328963049553931')
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'VS') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('811328908468420628')
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'WikiPedia') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('811328887120199720')
        }
    })

}