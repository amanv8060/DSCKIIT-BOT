const Discord = require("discord.js");
const data = require("../../../data/data.json");

module.exports = async (client, reaction, user) => {
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    if (user.bot) return;

    let ticketid = data["ticketMessageId"];
    if (!ticketid) return;
    if (reaction.message.id == ticketid && reaction.emoji.name == "🎫") {
        if (
            reaction.message.guild.channels.cache.some(
                (channel) => channel.name.toLowerCase() === "ticket-" + user.id
            )
        ) {
            reaction.users.remove(user);
            user.send("You already have a ticket");
        } else {
            reaction.users.remove(user);
            reaction.message.guild.channels
                .create(`ticket-${user.id}`, {
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: reaction.message.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: reaction.message.guild.roles.cache.find(
                                (role) => role.name === "Support Team"
                            ),
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        }
                    ],
                    type: "text",
                    parent: data["ticketCategoryId"]
                })
                .then(async (channel) => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Welcome to your ticket!")
                        .setDescription(
                            "Support Team will be with you shortly \n Use `?ticketclose command in this channel to close your ticket`"
                        )
                        .setColor("RANDOM");

                    channel.send({
                        content: `<@${user.id}>`,
                        embeds: [embed]
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
