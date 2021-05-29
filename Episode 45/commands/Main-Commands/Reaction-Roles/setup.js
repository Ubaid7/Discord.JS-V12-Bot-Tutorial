const { MessageEmbed } = require('discord.js')
const EditMessage = require('../../../utils/EditMessage')

module.exports = (client) => {
    EditMessage(client, '811316961400193074', new MessageEmbed()
    .setTitle('Reaction Roles')
    .setColor('RED')
    .setDescription(`**React**
<:Yt:806408246733832232> React With To Get YouTube Role
<:GitHub:811297109953347595> React With To Get GitHub Role
<:VS:811297141669888040> React With To Get Visual Studio Role
<:WikiPedia:811297151069323274> React With To Get WikiPedia Role
    `)
    .setFooter('Reaction Roles')
    , ['<:Yt:806408246733832232>', '<:GitHub:811297109953347595>', '<:VS:811297141669888040>', '<:WikiPedia:811297151069323274>']
    )
}