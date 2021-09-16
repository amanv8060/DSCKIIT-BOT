# DSC KIIT DISCORD BOT

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![GitHub stars](https://img.shields.io/github/stars/amanv8060/dsckiitbot.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/amanv8060/dsckiitbot/stargazers/)

## Purpose

This bot is created for the [Discord server](https://discord.gg/NAyQZpq7GM) of [DSC KIIT](https://dsckiit.in) . It is a general purpose discord bot having an additional Ticketing feature . Over the period of time I am planning to include more basic facilities.

## Run this YourSelf

On Discord developer Portal

1.  Create an application.
2.  Create a bot account.
3.  Obtain OAuth Token

Other Steps

4.  Get the code from the repo .
5.  in an env file set the values for `BOT_TOKEN` & `PREFIX`.
6.  in data.json replace the following values as mentioned

        {
        "guildid": "id of the guild in which bot would be there,
        "questionChannelId": id of the channel where the askQuestion command should ask question
        }

7.  run `npm i`
8.  run npm start
9.  run `ticketsetup` command and then add the values of `ticketCategoryId` , `logChannelId` and `ticketMessageId` that you get from the reply to data.json

> Note : Setting up Ticketing system is currently kind of non-user friendly , Integrating a database for making it user friendly is on the list.

Code Structure: 

- 📂 __dsckiitbot__
   - 📄 [LICENSE](LICENSE)
   - 📄 [Procfile](Procfile)
   - 📄 [README.md](README.md)
   - 📂 __data__
     - 📄 [data.json](data/data.json)
     - 📄 [dscdata.json](data/dscdata.json)
     - 📄 [dsdata.json](data/dsdata.json)
   - 📄 [package\-lock.json](package-lock.json)
   - 📄 [package.json](package.json)
   - 📂 __src__
     - 📄 [bot.js](src/bot.js)
     - 📂 __commands__
       - 📂 __misc__
         - 📄 [askQuestion.js](src/commands/misc/askQuestion.js)
         - 📄 [botinfo.js](src/commands/misc/botinfo.js)
         - 📄 [ping.js](src/commands/misc/ping.js)
         - 📄 [serverinvite.js](src/commands/misc/serverinvite.js)
         - 📄 [userinfo.js](src/commands/misc/userinfo.js)
       - 📂 __mod__
         - 📄 [ban.js](src/commands/mod/ban.js)
         - 📄 [kick.js](src/commands/mod/kick.js)
         - 📄 [listbans.js](src/commands/mod/listbans.js)
         - 📄 [purge.js](src/commands/mod/purge.js)
         - 📄 [unban.js](src/commands/mod/unban.js)
       - 📂 __projects__
         - 📄 [dscBot.js](src/commands/projects/dscBot.js)
         - 📄 [lms.js](src/commands/projects/lms.js)
       - 📂 __tickets__
         - 📄 [ticketClose.js](src/commands/tickets/ticketClose.js)
         - 📄 [ticketSetup.js](src/commands/tickets/ticketSetup.js)
     - 📂 __events__
       - 📂 __members__
         - 📄 [guildMemberAdd.js](src/events/members/guildMemberAdd.js)
         - 📄 [guildMemberRemove.js](src/events/members/guildMemberRemove.js)
       - 📂 __message__
         - 📄 [messageCreate.js](src/events/message/messageCreate.js)
       - 📂 __misc__
         - 📄 [ready.js](src/events/misc/ready.js)
       - 📂 __reactions__
         - 📄 [messageReactionAdd.js](src/events/reactions/messageReactionAdd.js)
     - 📂 __utils__
       - 📄 [registry.js](src/utils/registry.js)
       - 📄 [tableConfig.js](src/utils/tableConfig.js)
       - 📄 [validate.js](src/utils/validate.js)


## Contributing

Every contibution , even small are welcome : 

1. If you find any bug , please feel free to create an issue.
2. Pull Requests should be properly documented.
3. Give me 24-48 hrs to respond.

## Contributors

<a href="https://github.com/amanv8060/dsckiitbot/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=amanv8060/dsckiitbot" />
</a>

#### Show some ❤️ by starring the repository!

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
