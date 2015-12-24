#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var mkpath = require('mkpath');
var fs = require('fs');
var clone = require("nodegit").Clone.clone;
console.log('download git');
// Clone a given repository into a specific folder. 

console.log('Hello, World!');
program
    .version('0.0.1')
    .arguments('<cmd> [env]')
    .action(function (cmd, env) {
        cmdValue = cmd;
        envValue = env;
    });

program.parse(process.argv);

if (typeof cmdValue === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}
if (cmdValue === 'create') {
    if (envValue) {
        var project = './' + envValue;
        //create directory
        console.log('creating project directories');
        clone("https://github.com/mistraljs/startup", envValue, null)
            // Display information about the blob. 
            .then(function (blob) {
                console.log(blob);
                // Show the name, sha, and filesize in bytes. 
                console.log(blob.entry.name() + blob.entry.sha() + blob.size() + "b");

                // Show a spacer. 
                console.log(Array(72).join("=") + "\n\n");

                // Show the entire file. 
                console.log(String(blob));
            })
            .catch(function (err) {
                console.log(err);
            });

    } else {
        console.log("Mistral Create <project name>");
    }
}
console.log('command:', cmdValue);
console.log('environment:', envValue || "no environment given");
