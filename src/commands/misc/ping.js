/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
module.exports = {
    name: "ping",
    description: "Ping!",
    run: async (client, message) => {
        message.channel.send(
            `D-did I do it right? I responded in **${client.ws.ping} ms**.`
        );
    },
    aliases: []
};
