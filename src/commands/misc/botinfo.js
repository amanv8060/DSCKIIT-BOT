const { MessageEmbed } = require('discord.js')
const Config = require('../../../config.json')
module.exports = {
    name: 'botinfo',
    run: async (client, message, args) => {
        let ms = client.uptime
        let days = Math.floor(ms / 86400000)
        let hours = Math.floor(ms / 3600000) % 24
        let minutes = Math.floor(ms / 60000) % 60
        let seconds = Math.floor(ms / 1000) % 60

        const embed = new MessageEmbed()
            .setTitle('DSC KIIT Bot')
            .setDescription('Created By @Dantesinferno#2554')
            .addFields([
                {
                    name: 'Name',
                    value: Config.name,
                },
                {
                    name: 'Version',
                    value: Config.version,
                },
                {
                    name: 'Uptime',
                    value: `${days}d ${hours}h ${minutes}m ${seconds}s`,
                },
            ])
        message.channel.send(embed)
        // message.channel.send("Open Source Contributions are always welcome");
    },
    aliases: [],

    description: 'Sends the Bot Info',
}
