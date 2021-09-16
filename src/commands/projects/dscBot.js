/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
module.exports = {
    name: "dscbot",
    description: "Tells About This Bot",
    run: async (client, message) => {
        message.author
            .send(
                "Hey there ,This is a Bot created to cater the general Moderation and ticketing needs of our server. " +
                    "The codebase for this bot is open-source , You can check it out here : https://github.com/amanv8060/dsckiitbot "
            )
            .then(() => {
                message.channel.send("Sent You a dm");
            })
            .catch((er) => {
                message.channel.send(
                    "Tried Sending You Dm  , but was unable to "
                );
                console.log(er);
            });
    },
    aliases: ["dsckiitbot"]
};
