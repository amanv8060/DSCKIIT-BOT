module.exports = (client, member) => {
  //   console.log("Guild member add was registered.");
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "welcome"
  );
  if (!channel) return;
  channel.send(`Hey ${member} , Welcome to the  DSC KIIT Public Server, `);
};
