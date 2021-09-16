/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
module.exports = {
    name: "kick",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("KICK_MEMBERS"))
            message.channel.send(
                "You don't have permission to use that command."
            );
        else {
            let user = message.mentions.users.first();

            const kickReason = message.content.split(",").splice(1);
            if (!user) {
                message.channel.send("No User Mentioned");
            } else if (!kickReason[0]) {
                message.channel.send(
                    "No Kick Reason Specified : Enter in the Format like `?kick @user , reason `"
                );
            } else if (user == message.author) {
                message.channel.send("You cant kick yourself");
            } else {
                user = message.guild.members.resolve(user);
                if (!user.kickable) {
                    message.channel.send(
                        "InSufficient Permissions to Kick This Person"
                    );
                    return;
                }
                try {
                    kickReason = kickReason[0];
                    await message.guild.members.kick(user,  kickReason);
                    message.channel.send(`Kicked ${user} , reason : ${kickReason}`);
                    console.log("A member was kicked. ");
                } catch (err) {
                    console.log(err);
                }
            }
        }
    },

    aliases: [],
    description: "Kicks a user"
};
