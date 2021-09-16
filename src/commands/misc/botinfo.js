/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
const { MessageEmbed } = require("discord.js");
const { version } = require("../../../package.json");
module.exports = {
    name: "botinfo",
    run: async (client, message) => {
        let ms = client.uptime;
        let days = Math.floor(ms / 86400000);
        let hours = Math.floor(ms / 3600000) % 24;
        let minutes = Math.floor(ms / 60000) % 60;
        let seconds = Math.floor(ms / 1000) % 60;

        const embed = new MessageEmbed()
            .setTitle("DSC KIIT Bot")
            .setDescription("Created By @Dantesinferno#2554")
            .addFields([
                {
                    name: "Name",
                    value: "DSC KIIT"
                },
                {
                    name: "Version",
                    value: version
                },
                {
                    name: "Uptime",
                    value: `${days}d ${hours}h ${minutes}m ${seconds}s`
                }
            ]);
        message.channel.send({ embeds: [embed] });
    },
    aliases: [],

    description: "Sends the Bot Info"
};
