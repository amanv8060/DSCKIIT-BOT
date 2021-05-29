require('dotenv').config();
const discord = require('discord.js');
const message = require('./events/message/message');
const client = new discord.Client({ partials: ['MESSAGE', 'REACTION']});
const { registerCommands, registerEvents , createDb } = require('./utils/registry');
(async () => {
    client.login(process.env.BOT_TOKEN);
    client.commands = new Map();
    client.cachedMessageReactions = new Map();
    // client.on('message', (message)=>{
    
    // });

//     client.on("messageReactionAdd",(reaction , user)=>{
// reaction.message.guild.channels.cache.so
//     }   );
    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');

})();