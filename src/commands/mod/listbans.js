/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "listbans",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS"))
            message.channel.send(
                "You don't have permission to use that command."
            );
        else {
            try {
                let bans = await message.guild.bans.fetch();
                bans = [...bans.values()];
                if (bans.length === 0) {
                    return message.channel.send("No users banned till now");
                }
                let embed = new MessageEmbed();

                embed.setTitle("Banned Users");
                embed.setColor(0xff0000);
                embed.setFooter(`${message.guild.name} | ${message.guild.id}`);
                embed.setTimestamp();
                embed.setThumbnail(message.guild.iconURL());
                embed.setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL
                );
                embed.setDescription("List of Banned Users");
                for (let ban of bans) {
                    embed.addField(
                        `${ban.user.tag} (${ban.user.id})`,
                        ban.reason !== null
                            ? `${ban.reason}`
                            : "No reason provided"
                    );
                }
                message.channel.send({ embeds: [embed] });
            } catch (err) {
                console.log(err);
                message.channel.send(
                    "Some Error Occurred , Please inform the issue "
                );
            }
        }
    },
    aliases: [],
    description: "Lists all banned users"
};
