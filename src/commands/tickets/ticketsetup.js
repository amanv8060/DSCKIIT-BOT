const Discord = require("discord.js");
const Database = require("better-sqlite3");
require("dotenv").config();
module.exports = {
  name: "ticketsetup",
  description: "ticketsetup!",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply(`Become a admin MAN`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.reply(`Usage: ${process.env.PREFIX}ticketsetup #channel`);
    const rle = message.guild.roles.cache.find(
      (role) => role.name === "Support Team"
    );

    const db = new Database("data/ticketsSettings.db", {
      verbose: console.log,
    });
    const createTable =
      "CREATE TABLE IF NOT EXISTS servers ('guildid' varchar primary key, 'messageid' varchar , 'logChannelId' varchar );";
    db.exec(createTable);
    if (!rle)
      return message.reply(
        "Hmmm I coudl't find a role called `Support Team` Make sure you have a role called `Support Team` with same capitalisation and all you moderators are havingp it"
      );

    let sent = await channel.send(
      new Discord.MessageEmbed()
        .setTitle("Ticket System")
        .setDescription("React to open a ticket!")
        .setFooter("Ticket System")
        .setColor("00ff00")
    );
    const logChannel = await message.guild.channels.create("tickets-log", {
      type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
      permissionOverwrites: [
        {
          id: message.guild.roles.everyone,
          deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"], //Deny permissions
        },
      ],
    });
    const insert = db.prepare(
      "INSERT OR REPLACE INTO servers (guildid, messageid , logChannelId ) VALUES (@guildid , @messageid , @logChannel)"
    );
   
    insert.run({
      guildid: message.guild.id,
      messageid: sent.id,
      logChannel: logChannel.id,
    });

    sent.react("🎫");

    message.channel.send("Ticket System Setup Done!");
  },
  aliases: [],
};
