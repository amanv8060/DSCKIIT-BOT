const Discord = require("discord.js");

module.exports = {
  name: "userinfo",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      message.channel.send("You don't have permission to use that command.");
    else {
      let user = message.mentions.users.first();
      if (!user) {
        message.channel.send("No User Mentioned");
      } else {
        user = message.guild.members.resolve(user);
        const embed = new Discord.MessageEmbed()

          .setTitle("User Info")
          .setColor(user.displayHexColor)
          .addFields([
            { name: "Name", value: user.displayName },
            {
              name: "Joined This Server on",
              value: user.joinedAt,
            },
            {
                name:"Discord Nitro Since",
                value :user.premiumSince===null?"Never Used":user.premiumSince
            }
          ]);
        try {
          message.channel.send(embed);
        } catch (err) {
          console.log(err);
        }
      }
    }
  },

  aliases: [],
  description: "Gives Info About a User",
};
