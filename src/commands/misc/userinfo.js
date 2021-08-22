const Discord = require("discord.js");

module.exports = {
    name: "userinfo",
    run: async (client, message) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            message.channel.send(
                "You don't have permission to use that command."
            );
        else {
            let user = message.mentions.users.first();
            if (!user) {
                message.channel.send("No User Mentioned");
            } else {
                user = message.guild.members.resolve(user);
                const premiumSince =
                    user.premiumSince === null
                        ? "Not using currently"
                        : String(user.premiumSince);
                const embed = new Discord.MessageEmbed()
                    .setTitle("User Info")
                    .setColor(user.displayHexColor)
                    .addFields([
                        { name: "Name", value: user.displayName },
                        {
                            name: "Joined This Server on",
                            value: String(user.joinedAt)
                        },
                        {
                            name: "Discord Nitro Since",
                            value: premiumSince
                        }
                    ]);
                try {
                    message.channel.send({ embeds: [embed] });
                } catch (err) {
                    console.log(err);
                }
            }
        }
    },

    aliases: [],
    description: "Gives Info About a User"
};
