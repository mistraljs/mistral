#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var _ = require('underscore');
var fs = require('fs');
var clone = require("nodegit").Clone.clone;
var execSync = require('child_process').execSync,
    child;
var connect = require('connect');
var serveStatic = require('serve-static');

program
    .version('0.0.5')
    .arguments('<cmd> [env]')
    .action(function (cmd, env) {
        cmdValue = cmd;
        envValue = env;
    });

program.parse(process.argv);

if (typeof cmdValue === 'undefined') {
    var packages = fs.readFileSync('./.mistral/packages').toString();
    //console.log(packages);

    var pkgs = packages.split('\n');
    //console.log(pkgs);
    _.each(pkgs,function(element, index, list){
        //console.log(element);
        console.log("install : " + element);
        child = execSync('npm install --prefix ./assets/ '+ element,
            function (error, stdout, stderr) {
                //console.log('stdout: ' + stdout);
                //console.log('stderr: ' + stderr);
                //if (error !== null) {
                //    console.log('exec error: ' + error);
                //}
            });
        console.log('finish installing ' + element);

    });
    console.log('Your app run on http://localhost:9000');
    execSync('http-server -p 9000 -a localhost');
    //connect().use(serveStatic(__dirname)).listen(9000);
    process.exit(1);
}
else if (cmdValue === 'create') {
    if (envValue) {
        var project = './' + envValue;
        //create directory
        console.log('creating project directories');
        clone("https://github.com/mistraljs/startup", envValue, null)
            // Display information about the blob. 
            .then(function (blob) {
                //console.log(blob);
                //// Show the name, sha, and filesize in bytes.
                //console.log(blob.entry.name() + blob.entry.sha() + blob.size() + "b");
                //
                //// Show a spacer.
                //console.log(Array(72).join("=") + "\n\n");
                //
                //// Show the entire file.
                //console.log(String(blob));
                console.log('Created!');
                console.log('> cd '+ envValue);
                console.log('> mistral');
            })
            .catch(function (err) {
                console.log(err);
            });

    } else {
        console.log("Mistral Create <project name>");
    }
}
//console.log('command:', cmdValue);
//console.log('environment:', envValue || "no environment given");
