const addReactions = (message, reactions) => {
    message.react(reactions[0])
    reactions.shift()
    if(reactions.length > 0) {
        setTimeout(() => addReactions(message, reactions), 500)
    }
}

module.exports = async (client, id, text, reactions = []) => {
    const channel = await client.channels.fetch(id) // Send Message In Channel ID Provided

    channel.messages.fetch().then((messages) => {
        if(messages.size === 0) {
            // Send Message In Channel ID Provided
            // Send Text
            channel.send(text).then((message) => {
                // Add Reaction
                addReactions(message, reactions)
            })
        } else {
            // Edit Message After Sent
            for(const message of messages) {
                //Edit Text
                message[1].edit(text)
                // Edit Reaction
                addReactions(message[1], reactions)
            }
        }
    })
}
