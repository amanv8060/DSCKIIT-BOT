const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ticketsetup",
    description: "Sets up the Ticketing System",
    run: async (client, message) => {
        if (!message.member.permissions.has("ADMINISTRATOR"))
            return message.reply(`Become a admin MAN`);

        let sent, category, logChannel, channel;

        //creating tickets category
        try {
            category = await message.guild.channels.create("Tickets", {
                type: "GUILD_CATEGORY"
            });
        } catch (er) {
            return message.reply(
                "Failed to create a category while setting up" + `Error ${er}`
            );
        }
        const role = message.guild.roles.cache.find(
            (role) => role.name === "Support Team"
        );
        //if role is not found, create it
        if (!role)
            try {
                role = await message.guild.roles.create({
                    name: "Support Team",
                    color: "BLUE",
                    reason: "Support team for ticketing system"
                });
            } catch (e) {
                return message.reply(
                    `Failed to create the Support role . Error : ${e}`
                );
            }
        //creating ticket channel
        try {
            channel = await message.guild.channels.create("🎫-tickets", {
                type: "text",
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone,
                        deny: [
                            "VIEW_CHANNEL",
                            "SEND_MESSAGES",
                            "READ_MESSAGE_HISTORY"
                        ] //Deny permissions
                    }
                ],
                parent: category.id
            });
        } catch (e) {
            return message.reply("Failed to Create Ticket channel. Error" + e);
        }
        //sending message to the channel
        try {
            const embed = new MessageEmbed()
                .setTitle("Ticket System")
                .setDescription("React to open a ticket!")
                .setFooter("Ticket System")
                .setColor("00ff00");
            sent = await channel.send({
                embeds: [embed]
            });
        } catch (e) {
            return message.reply(`Failed to Send the message. Error : ${e}`);
        }
        //creating log channel
        try {
            logChannel = await message.guild.channels.create("tickets-log", {
                type: "text",
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone,
                        deny: [
                            "VIEW_CHANNEL",
                            "SEND_MESSAGES",
                            "READ_MESSAGE_HISTORY"
                        ] //Deny permissions
                    }
                ],
                parent: category.id
            });
        } catch (e) {
            return message.reply("Failed to Create log channel. Error" + e);
        }

        sent.react("🎫");

        message.channel.send(
            "Ticket System Setup Done! Here are the values" +
                `\n\nticketCategoryId : ${category.id}` +
                `\nlogChannelId:  ${logChannel.id}` +
                `\nticketMessageId: ${sent.id}` +
                "\n\nRunning this command again will create another set of configuration" +
                `\n Also <@&${role.id}> will be having access to the tickets`
        );
    },
    aliases: []
};
