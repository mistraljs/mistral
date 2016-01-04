#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var fs = require('fs');
var clone = require("nodegit").Clone.clone;
var execSync = require('child_process').execSync,
    child;

program
    .version('0.0.5')
    .arguments('<cmd> [env]')
    .action(function (cmd, env) {
        cmdValue = cmd;
        envValue = env;
    });

program.parse(process.argv);

if (typeof cmdValue === 'undefined') {

    build();

    console.log('Your app run on http://localhost:9000');
    execSync('http-server -p 9000 -a localhost');
    //connect().use(serveStatic(__dirname)).listen(9000);
    process.exit(1);
}
else if (cmdValue === 'build') {
    build();

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
                console.log('> cd ' + envValue);
                console.log('> mistral');
            })
            .catch(function (err) {
                console.log(err);
            });

    } else {
        console.log("Mistral Create <project name>");
    }
}

function build() {
    //var packages = fs.readFileSync('./.mistral/packages').toString();
    ////console.log(packages);
    //
    //var pkgs = packages.split('\n');
    ////console.log(pkgs);
    //_.each(pkgs,function(element, index, list){
    //    //console.log(element);
    //    console.log("install : " + element);
    //    child = execSync('npm install --prefix ./assets/ '+ element,
    //        function (error, stdout, stderr) {
    //            //console.log('stdout: ' + stdout);
    //            //console.log('stderr: ' + stderr);
    //            //if (error !== null) {
    //            //    console.log('exec error: ' + error);
    //            //}
    //        });
    //    console.log('finish installing ' + element);
    //
    //});
    if (!fs.existsSync('./build'))
        fs.mkdir('./build');
    var mod = fs.readFileSync('./modules.json').toString();
    console.log(mod);
    mod = JSON.parse(mod);
    var prodScripts = '';
    var prodStyles = '';

    for (var ii = 0; ii < mod.modules.scripts.length; ii++) {
        var j = fs.readFileSync(mod.modules.scripts[ii]["file"]).toString();
        if (mod.modules.scripts[ii]["type"] == 'javascript')
            prodScripts = prodScripts + '\n\n' + j;
    }
    for (var ii = 0; ii < mod.modules.css.length; ii++) {
        var j = fs.readFileSync(mod.modules.css[ii]["file"]).toString();
        if (mod.modules.css[ii]["type"] == 'css')
            prodStyles = prodStyles + '\n\n' + j;
    }
    for (var ii = 0; ii < mod.modules.dir.length; ii++) {
        console.log(mod.modules.dir[ii]);
        var filenames = fs.readdirSync(mod.modules.dir[ii].path);
        filenames.forEach(function (filename) {
            console.log(filename);
            if (!fs.existsSync('./build/'+ mod.modules.dir[ii].name))
                fs.mkdir('./build/'+ mod.modules.dir[ii].name);
            fs.createReadStream(mod.modules.dir[ii].path + '/' + filename).pipe(fs.createWriteStream('./build/'+ mod.modules.dir[ii].name+'/'+ filename));
        });

    }
    if (!fs.existsSync('./build/js'))
        fs.mkdir('./build/js');
    fs.writeFileSync("./build/js/scripts.js", prodScripts, 'utf8', function (err) {
        if (err) {
            console.log('error on insert scripts');
            return console.log(err);
        }

        console.log("The file was saved!");
    });
    if (!fs.existsSync('./build/css'))
        fs.mkdir('./build/css');
    fs.writeFileSync("./build/css/styles.css", prodStyles, 'utf8', function (err) {
        if (err) {
            console.log('error on insert styles');
            return console.log(err);
        }

        console.log("The file was saved!");
    });
    var html = fs.readFileSync('./index.html').toString();
    html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<link[\s\S]*? \/>/gi, '');
    var d = new Date();
    var scriptTag = '<script src="build/js/scripts.js?v=' + d.getTime() + '"></script>';
    var styleTag = '\n<link href="build/css/styles.css?v=' + d.getTime() + '" rel="stylesheet" />';
    html = html.replace('</head>', scriptTag + styleTag + '\n</head>');
    //console.log(html);
    //var $html = $('<html />',{html:html});
    //$html.find('head').append('<script src="build/scripts.js"></script>');
    //$html.find('head').append('<link href="build/styles.css" rel="stylesheet" />');
    //console.log($html.html());
    fs.writeFileSync("./index.html", html, 'utf8', function (err) {
        if (err) {
            console.log('error on insert index html');
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}
//console.log('command:', cmdValue);
//console.log('environment:', envValue || "no environment given");
