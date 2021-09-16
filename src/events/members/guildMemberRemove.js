/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/
module.exports = (client, member) => {
    //   console.log("Guild member add was registered.");
    const channel = member.guild.channels.cache.find(
        (ch) => ch.name === "welcome"
    );
    if (!channel) return;
    channel.send(`${member.user.tag} , just left us :(`);
};
