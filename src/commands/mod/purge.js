/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
module.exports = {
    name: "purge",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            message.channel.send(
                "You don't have permission to use that command."
            );
        else {
            let num = parseInt(args);
            if (isNaN(num)) {
                message.channel.send(`${typeof num}`);
            } else {
                // message.channel.send("ok");
                await message.channel
                    .bulkDelete(num, true)
                    .then((messages) => {
                        message.channel.send(
                            `Bulk deleted ${messages.size} messages`
                        );
                    })
                    .catch((er) => {
                        console.log(er);
                    });
            }
        }
    },

    aliases: [],
    description: "Bulk Deletes Message"
};
