module.exports = (client) => {

    // Adding Roles When Reacted
    client.on('messageReactionAdd', async(reaction, user) => {

        const reactionrole = '811317702064340992' // Message ID For Reaction Roles

        if(reaction.message.id === reactionrole && reaction.emoji.name === 'Yt') { // Your Emoji Name
            await reaction.message.guild.members.cache.get(user.id).roles.add('811328860414541884') // Role You Want To Add When SomeOne Reacts
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'GitHub') { // Your Emoji Name
            await reaction.message.guild.members.cache.get(user.id).roles.add('811328963049553931') // Role You Want To Add When SomeOne Reacts
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'VS') { // Your Emoji Name
            await reaction.message.guild.members.cache.get(user.id).roles.add('811328908468420628') // Role You Want To Add When SomeOne Reacts
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'WikiPedia') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('811328887120199720') // Role You Want To Add When SomeOne Reacts
        }
    })

    // Removing Roles When Reacted
    client.on('messageReactionRemove', async(reaction, user) => {

        const reactionrole = '811317702064340992' // Message ID For Reaction Roles

        if(reaction.message.id === reactionrole && reaction.emoji.name === 'Yt') { // Your Emoji Name
            await reaction.message.guild.members.cache.get(user.id).roles.remove('811328860414541884') // Role You Want To Remove When SomeOne Reacts(Should Be Same As Add One As Above)
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'GitHub') { // Your Emoji Name
            await reaction.message.guild.members.cache.get(user.id).roles.remove('811328963049553931') // Role You Want To Remove When SomeOne Reacts(Should Be Same As Add One As Above)
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'VS') { // Your Emoji Name
            await reaction.message.guild.members.cache.get(user.id).roles.remove('811328908468420628') // Role You Want To Remove When SomeOne Reacts(Should Be Same As Add One As Above)
        }
        if(reaction.message.id === reactionrole && reaction.emoji.name === 'WikiPedia') { // Your Emoji Name
            await reaction.message.guild.members.cache.get(user.id).roles.remove('811328887120199720') // Role You Want To Remove When SomeOne Reacts(Should Be Same As Add One As Above)
        }
    })

}
