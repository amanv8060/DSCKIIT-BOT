const Discord = require("discord.js");
const Database = require("better-sqlite3");

module.exports = async (client, reaction, user) => {
  // console.log(reaction);
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  if (user.bot) return;
  const db = new Database("data/ticketsSettings.db", {
    verbose: console.log,
  });
  const row = db.prepare("SELECT * from servers WHERE guildid = ?").get(reaction.message.channel.guild.id);
  let ticketid = row.messageid;
  if (!ticketid) return;
  if (reaction.message.id == ticketid && reaction.emoji.name == "🎫") {
    if (
      reaction.message.guild.channels.cache.some(
        (channel) => channel.name.toLowerCase() === "ticket-" + user.id
      )
    ) {
      user.send("You already have a ticket");
    } else {
      reaction.users.remove(user);
      reaction.message.guild.channels
        .create(`ticket-${user.id}`, {
          permissionOverwrites: [
            {
              id: user.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
            },
            {
              id: reaction.message.guild.roles.everyone,
              deny: ["VIEW_CHANNEL"],
            },
            {
              id: reaction.message.guild.roles.cache.find(
                (role) => role.name === "Support Team"
              ),
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
            },
          ],
          type: "text",
        })
        .then(async (channel) => {
          channel.send(
            `<@${user.id}>`,
            new Discord.MessageEmbed()
              .setTitle("Welcome to your ticket!")
              .setDescription(
                "Support Team will be with you shortly \n Use `?ticketclose command in this channel to close your ticket`"
              )
              .setColor("RANDOM")
          );
        });
    }
  }
};
