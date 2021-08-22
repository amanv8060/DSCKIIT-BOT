const data = require("../../../data/data.json");

module.exports = {
    name: "askQuestion",
    description: "Asks a question",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply("Become a admin MAN");
        }
        const questionChannel = message.guild.channels.cache.find(
            (channel) => channel.id === data["questionChannelId"]
        );

        console.log(args.length);
        if (!questionChannel) {
            message.channel.send("Question Channel Not Found");
        } else {
            questionChannel.send(
                "**Question**\n" + message.content.substr(12).trim()
            );
        }
    },
    aliases: []
};
