/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "serverinvite",
    description: "Sends the Server Invite Link!",
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setTitle("DSC KIIT Public Server")
            .setDescription(
                "You asked and here it is : https://discord.gg/NAyQZpq7GM"
            );
        message.channel.send({ embeds: [embed] });
    },
    aliases: []
};
