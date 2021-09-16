/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
module.exports = {
    name: "ban",
    run: async (client, message, args) => {
        //Format to execute this command ?ban @user , reason ~noofdaysofmessagestodelete(optional);
        if (!message.member.permissions.has("BAN_MEMBERS"))
            message.channel.send(
                "You don't have permission to use that command."
            );
        else {
            let user = message.mentions.users.first();

            if (!user) {
                return message.channel.send("No User Mentioned");
            }

            let noOfdays = message.content.split("~");
            const banReason = noOfdays[0].split(",").splice(1);

            if (user == message.author) {
                return message.channel.send("You can't ban yourself");
            }
            if (!banReason[0]) {
                return message.channel.send(
                    "No Ban Reason Specified : Enter in the Format like `?ban @user , reason ~noofdaysofmessagestodelete(optional)`"
                );
            }

            user = message.guild.members.resolve(user);
            if (!user.bannable) {
                message.channel.send(
                    "InSufficient Permissions to Kick This Person"
                );
                return;
            }
            try {
                //this means the noof days is specified
                if (noOfdays.length > 1) {
                    noOfdays = parseInt(noOfdays[1]);

                    //discord api doesn't allow deleting messages old than 7 days

                    if (isNaN(noOfdays) || noOfdays < 0 || noOfdays > 7)
                        return message.channel.send(
                            "Invalid no of days specified"
                        );

                    await message.guild.members.ban(user, {
                        days: noOfdays,
                        reason: banReason.join()
                    });
                } else {
                    await message.guild.members.ban(user, {
                        reason: banReason.join()
                    });
                }
                message.channel.send(`Banned ${user.user.tag} , reason : ${banReason}`);
            } catch (err) {
                console.log(err);
                return message.channel.send(
                    "Some Error Occurred , Please inform the issue , and ban manually for now "
                );
            }
        }
    },
    aliases: [],
    description: "Bans a user"
};
