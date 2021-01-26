module.exports = {
  name: "kick",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS"))
      message.channel.send("You don't have permission to use that command.");
    else {
      let user = message.mentions.users.first();
      const kickReason = message.content.split(",").splice(1);
      console.log(kickReason);
      if (!user) {
        message.channel.send("No User Mentioned");
      } else if (!kickReason[0]) {
        message.channel.send(
          "No Kick Reason Specified : Enter in the Format like `?kick @user , reason `"
        );
      } else if (user == message.author||!user.kickable) {
        message.channel.send("InSufficient Permissions to Kick This Person");
      } else {
        try {
          //   user = user.user;
          await message.guild.member(user).kick(kickReason);
          message.channel.send(`Kicked ${user.username}`);
          console.log("A member was kicked. ");
        } catch (err) {
          console.log(err);
        }
      }
    }
  },

  aliases: [],
  description: "Kicks a user",
};
