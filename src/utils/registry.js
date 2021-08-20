const c = require("ansi-colors");
const fs = require("fs").promises;

const path = require("path");
const { checkCommandModule, checkProperties } = require("./validate");
const commandStatus = [
        [
            `${c.bold("Command")}`,
            `${c.bold("Status")}`,
            `${c.bold("Description")}`
        ]
    ],
    eventStatus = [
        [
            `${c.bold("Event")}`,
            `${c.bold("Status")}`,
            `${c.bold("Description")}`
        ]
    ];

async function registerCommands(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory())
            // If file is a directory, recursive call recurDir
            registerCommands(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if (file.endsWith(".js")) {
                let cmdNameFrmFile = file.substring(0, file.indexOf(".js"));
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    if (checkCommandModule(cmdNameFrmFile, cmdModule)) {
                        let cmdName = cmdModule.name;
                        if (checkProperties(cmdModule)) {
                            let aliases = cmdModule.aliases;
                            client.commands.set(cmdName, cmdModule.run);
                            if (aliases.length !== 0)
                                aliases.forEach((alias) =>
                                    client.commands.set(alias, cmdModule.run)
                                );
                            commandStatus.push([
                                `${c.cyan(`${cmdName}`)}`,
                                `${c.bgGreenBright("Success")}`,
                                `${cmdModule.description}`
                            ]);
                        }
                    }
                } catch (err) {
                    console.log(err);
                    commandStatus.push([
                        `${c.white(`${cmdNameFrmFile}`)}`,
                        `${c.bgRedBright("Failed")}`,
                        ""
                    ]);
                }
            }
        }
    }
    // console.log(client.commands);
}

async function registerEvents(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory())
            // If file is a directory, recursive call recurDir
            registerEvents(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if (file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                    eventStatus.push([
                        `${c.cyan(`${eventName}`)}`,
                        `${c.bgGreenBright("Success")}`,
                        `${eventModule.description}`
                    ]);
                } catch (err) {
                    console.log(err);
                    eventStatus.push([
                        `${c.white(`${eventName}`)}`,
                        `${c.bgRedBright("Failed")}`,
                        ""
                    ]);
                }
            }
        }
    }
}

module.exports = {
    commandStatus,
    eventStatus,
    registerEvents,
    registerCommands
};
