/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
const data = require("../../../data/data.json");

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
                                    return ` * ${emoji} ${Array.from(
                                        reaction.values()
                                    )
                                        .map(({ username }) => `@${username}`)
                                        .join(", ")}`;
                                }
                            )
                        )
                    ).join("\n");

                    content += `\n${reactions}`;
                }
                if (message.attachments.size) {
                    const attachments = message.attachments.map(
                        (xyz) => xyz.url
                    );
                    content += `\nAttachments ${attachments}`;
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
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const temp = await channel.messages.fetch(
            messages.length ? { before: messages[0].id } : undefined
        );
        const batch = [...temp.values()];
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
    run: async (client, message) => {
        if (!message.channel.name.includes("ticket-"))
            return message.channel.send("You cannot use that here!");
        let channel = message.channel;
        let user;
        await message.guild.members
            .fetch(message.channel.name.substring(7))
            .then((member) => {
                user = member;
            })
            .catch((error) => {
                console.log(error);
            });
        const messages = await fetchMessages(channel);
        let content = await generateContent(messages);
        if (!user) {
            message.channel.send(
                "Error finding the user or user has left the server"
            );
        } else {
            await user
                .send(
                    `Transcript for your ticket in ${message.guild.name} Server`
                )
                .catch((err) => {
                    console.log(err);
                });
            await user
                .send({
                    files: [
                        {
                            name: `${message.channel.name}.txt`,
                            attachment: Buffer.from(content)
                        }
                    ]
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        message.channel.send(
            `I have dmed you transcript if your dms are opened. Deleting channel in 30 seconds`
        );
        message.channel.send(
            `Just in case Your dms are closed here is transcript`
        );
        message.channel.send({
            files: [
                {
                    name: `${message.channel.name}.txt`,
                    attachment: Buffer.from(content)
                }
            ]
        });
        const logchannel = message.guild.channels.cache.find(
            (channel) => channel.id === data["logChannelId"]
        );
        if (!logchannel) message.channel.send("Log channel not found");
        else
            logchannel.send({
                content: `${user.displayName}`,
                files: [
                    {
                        name: `${message.channel.name}.txt`,
                        attachment: Buffer.from(content)
                    }
                ]
            });
        setTimeout(function () {
            message.channel.delete();
        }, 30000);
    },
    aliases: []
};
