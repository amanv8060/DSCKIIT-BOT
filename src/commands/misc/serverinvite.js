const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'serverinvite',
    description: 'Sends the Server Invite Link!',
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle('DSC KIIT Public Server')
            .setDescription(
                'You asked and here it is : https://discord.gg/NAyQZpq7GM'
            )
        message.channel.send(embed)
    },
    aliases: [],
}
