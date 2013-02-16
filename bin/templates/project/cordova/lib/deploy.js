/*
 *  Copyright 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * USPACEess required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var childProcess = require("child_process"),
    fs = require("fs"),
    path = require("path"),
    util = require("util"),
    wrench = require("wrench"),
    conf = require("./conf"),
    logger = require("./logger"),
    localize = require("./localize"),
    pkgrUtils = require("./packager-utils"),
    properties = require('../../project.json'),
    target = process.argv[2],
    workingdir = path.normalize(__dirname + "/.."),
    barPath = path.normalize(__dirname + "/.." + "/.." + "/build/" + target + "/" + properties.appname + ".bar");
    
    console.log(barPath);
    console.log(workingdir);

function generateOptions(target) {
    var options = [];
    
    options.push("-installApp");
    options.push("-launchApp");
    options.push("-device");
    options.push(properties.ip);
    options.push("-password");
    options.push(properties.password);
    options.push("-package");
    options.push(barPath);

    return options;
}

function execNativeDeploy(options, callback) {
    var script = "/bin/blackberry-deploy",
        nativeDeploy;

console.log(options);

    if (pkgrUtils.isWindows()) {
        script += ".bat";
    }

    if (fs.existsSync(conf.DEPENDENCIES_TOOLS)) {
        nativeDeploy = childProcess.spawn(path.normalize(conf.DEPENDENCIES_TOOLS + script), options, {
            "cwd": workingdir,
            "env": process.env
        });

        nativeDeploy.stdout.on("data", pkgrUtils.handleProcessOutput);

        nativeDeploy.stderr.on("data", pkgrUtils.handleProcessOutput);

        nativeDeploy.on("exit", function (code) {
            if (callback && typeof callback === "function") {
                callback(code);
            }
        });
    } else {
        throw localize.translate("EXCEPTION_MISSING_TOOLS");
    }
}

function exec(target, callback) {
    var options = generateOptions(target);
    execNativeDeploy(options, callback);
}

exec(target, null);
