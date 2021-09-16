/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
require("dotenv").config();
const discord = require("discord.js");
const client = new discord.Client({
    partials: ["MESSAGE", "REACTION"],
    intents: 32767
});
const { registerCommands, registerEvents } = require("./utils/registry");

const init = async () => {
    client.login(process.env.BOT_TOKEN);
    client.commands = new Map();
    client.cachedMessageReactions = new Map();
    await registerEvents(client, "../events");
    await registerCommands(client, "../commands");
};

init();
