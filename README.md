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

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
