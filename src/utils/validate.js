/*
Copyright 2021 Aman Verma. All rights reserved.
Use of this source code is governed by a MIT license that can be
found in the LICENSE file.
*/

/* eslint-disable no-prototype-builtins */
module.exports.checkCommandModule = (cmdName, cmdModule) => {
    if (!cmdModule.hasOwnProperty("name"))
        throw new Error(
            `${cmdName} command module does not have property 'name'`
        );
    if (!cmdModule.hasOwnProperty("run"))
        throw new Error(
            `${cmdName} command module does not have property 'run'`
        );
    if (!cmdModule.hasOwnProperty("description"))
        throw new Error(
            `${cmdName} command module does not have property 'description`
        );
    if (!cmdModule.hasOwnProperty("aliases"))
        throw new Error(
            `${cmdName} command module does not have property 'aliases'`
        );
    return true;
};
module.exports.checkProperties = (cmdModule) => {
    if (typeof cmdModule.run !== "function")
        throw new Error(`${cmdModule.name} command: run is not a function`);
    if (typeof cmdModule.description !== "string")
        throw new Error(
            `${cmdModule.name} command: description is not a string`
        );
    if (!Array.isArray(cmdModule.aliases))
        throw new Error(`${cmdModule.name} command: aliases is not an Array`);
    return true;
};
