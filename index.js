#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var mkpath = require('mkpath');
var fs = require('fs');

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
        mkpath.sync(project);
        mkpath.sync(project + '/.mistral');
        mkpath.sync(project + '/assets');
        mkpath.sync(project + '/assets/images');
        mkpath.sync(project + '/assets/modules');
        mkpath.sync(project + '/templates');
        mkpath.sync(project + '/pages');
        mkpath.sync(project + '/scripts');
        mkpath.sync(project + '/styles');
        mkpath.sync(project + '/server');
        //create system file
        //        fs.writeFile(project + "/packages.json", "test");
        //        fs.writeFile(project + "/bower.json", "test");
        //        fs.writeFile(project + "/gulpfile.js", "test");
        console.log('creating main files');
        //create startup file
        var version = fs.readFileSync('./base/version', "utf8");
        var mistraljs = fs.readFileSync('./base/mistral.js', "utf8");
        var routerjs = fs.readFileSync('./base/router.js', "utf8");
        var index = fs.readFileSync('./base/index.html', "utf8");
        var tNav = fs.readFileSync('./base/templates/nav.html', "utf8");
        var tLanding = fs.readFileSync('./base/templates/landing.html', "utf8");
        var tAbout = fs.readFileSync('./base/templates/about.html', "utf8");
        fs.writeFileSync(project + '/.mistral/version', version);
        fs.writeFileSync(project + '/.mistral/mistral.js', mistraljs);
        fs.writeFileSync(project + '/scripts/router.js', routerjs);
        fs.writeFileSync(project + '/pages/index.html', index);
        fs.writeFileSync(project + '/templates/about.html', tAbout);
        fs.writeFileSync(project + '/templates/landing.html', tLanding);
        fs.writeFileSync(project + '/templates/nav.html', tNav);
        console.log('created');
    } else {
        console.log("Mistral Create <project name>");
    }
}
//console.log('command:', cmdValue);
//console.log('environment:', envValue || "no environment given");
