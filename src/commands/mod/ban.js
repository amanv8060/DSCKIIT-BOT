module.exports = {
    name: "ban",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS"))
            message.channel.send(
                "You don't have permission to use that command."
            );
        else {
            let user = message.mentions.users.first();

            const banReason = message.content.split(",").splice(1);
            if (!user) {
                message.channel.send("No User Mentioned");
            } else if (!banReason[0]) {
                message.channel.send(
                    "No Ban Reason Specified : Enter in the Format like `?ban @user , reason `"
                );
            } else if (user == message.author) {
                message.channel.send("You cant ban yourself");
            } else {
                user = message.guild.members.resolve(user);
                if (!user.bannable) {
                    message.channel.send(
                        "InSufficient Permissions to Kick This Person"
                    );
                    return;
                }
                try {
                    await message.guild.members.ban(user, {
                        reason: banReason
                    });
                    message.channel.send(
                        `Banned ${user} , reason : ${banReason}`
                    );
                } catch (err) {
                    console.log(err);
                    message.channel.send(
                        "Some Error Occurred , Please inform the issue , and ban manually for now "
                    );
                }
            }
        }
    },
    aliases: [],
    description: "Bans a user"
};
