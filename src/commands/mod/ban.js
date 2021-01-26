module.exports = {
    name:"ban",
    run: async(client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS'))
                message.channel.send("You don't have permission to use that command.");
        else {
            
            let member = message.guild.members.cache.get(args);
            if(member) {
                try {
                    // await member.ban();
                    message.channel.send(member.name);
                    console.log('A member was banned.');
                }
                catch(err) {
                    console.log(err);
                }
            }
        }
    },
    aliases: [],
    description: 'Bans a user'
}