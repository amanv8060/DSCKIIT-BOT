const Discord = require("discord.js");

const Database = require("better-sqlite3");

async function generateContent(messages) {
  const generatedMessages = (
    await Promise.all(
      messages.map(async (message) => {
        let content = `**${message.author.username}:** ${message.content}`;

        if (message.reactions.cache.size) {
          const reactions = (
            await Promise.all(
              Array.from(message.reactions.cache.entries()).map(
                async ([emoji, { users }]) => {
                  const reaction = await users.fetch();
                  return ` * ${emoji} ${Array.from(reaction.values())
                    .map(({ username }) => `@${username}`)
                    .join(", ")}`;
                }
              )
            )
          ).join("\n");

          content += `\n${reactions}`;
        }
        if (message.attachments.size) {
          const attachments = message.attachments.map((xyz) => xyz.url);
          content+=`\nAttachments ${attachments}`;
        }
        return content;
      })
    )
  ).join("\n\n");

  return `Transcript\n\n${generatedMessages}\n`;
}

function getTranscriptMessages(messages) {
  return messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
}

async function fetchMessages(channel) {
  let messages = [];

  // Discord's API limits fetching messages to 50 at a time. Continue requesting batches
  // until we have no messages
  while (true) {
    const batch = (
      await channel.messages.fetch(
        messages.length ? { before: messages[0].id } : undefined
      )
    ).array();

    if (!batch.length) {
      break;
    }

    messages = [...getTranscriptMessages(batch), ...messages];
  }

  return messages.map((message) => {
    message.content = message.content.replace(
      /<@!?(\d+)>/g,
      (match, p1) => `@${channel.client.users.cache.get(p1).username}`
    );
    return message;
  });
}
module.exports = {
  name: "ticketclose",
  description: "Close the ticket!",
  run: async (client, message, args) => {
    if (!message.channel.name.includes("ticket-"))
      return message.channel.send("You cannot use that here!");
    let channel = message.channel;
    const user = message.guild.members.cache.find(
      (user) => user.id === message.channel.name.substring(7)
    );
    const messages = await fetchMessages(channel);
    let content = await generateContent(messages);
    // channel.messages.fetch({ limit: 80 })
    // .then(function (messages)  {
    // let content = messages
    //   .map((message) => message.content && message.content)
    //   .join("\n");

    const db = new Database("data/ticketsSettings.db", {
      verbose: console.log,
    });
    const row = db
      .prepare("SELECT * from servers WHERE guildid = ?")
      .get(message.channel.guild.id);

    user
      .send(`Transcript for your ticket in ${message.guild.name} Server`)
      .catch((err) => {});
    user
      .send({
        files: [{ name: "test.txt", attachment: Buffer.from(content) }],
      })
      .catch((err) => {});
    message.channel.send(
      `I have dmed you transcript if your dms are opened. Deleting channel in 30 seconds`
    );
    message.channel.send(`Just in case Your dms are closed here is transcript`);
    message.channel.send({
      files: [{ name: "test.txt", attachment: Buffer.from(content) }],
    });
    const logchannel = message.guild.channels.cache.find(
      (channel) => channel.id === row.logChannelId
    );
    logchannel.send(`${user.displayName}`, {
      files: [{ name: "test.txt", attachment: Buffer.from(content) }],
    });
    // });
    setTimeout(function () {
      message.channel.delete();
    }, 30000);
  },
  aliases: [],
};
