/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
module.exports = {
    name: "unban",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS"))
            message.channel.send(
                "You don't have permission to use that command."
            );
        else {
            args = args.split(" ");
            if (args.length < 1)
                return message.channel.send(
                    "Please provide valid arguments .  `?unban userid`"
                );

            let user = args[0];

            //minimum length of discord user id is 17
            if (user.length < 17)
                return message.channel.send("Invalid User id");

            try {
                const tempuser = await message.guild.bans.remove(user);
                message.channel.send(`Unbanned ${tempuser.tag}`);
            } catch (err) {
                console.log(err);
                if (err.code == 10026)
                    return message.channel.send("User is not banned");
                return message.channel.send(
                    "Some Error Occurred , Please inform the issue , and unban manually for now "
                );
            }
        }
    },
    aliases: [],
    description: "Unbans a user"
};
