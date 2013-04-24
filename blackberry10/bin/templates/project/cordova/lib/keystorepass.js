#!/usr/bin/env node

/*
 *  Copyright 2013 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var propertiesFile = 'project.json',
    properties = require('../../' + propertiesFile),
    fs = require('fs');

if ( process.argv[2] === "-h" || process.argv[2] === "--help" ) {
    console.log("\nUsage: keystorepass <password> \n");
    console.log("Options: \n");
    console.log("   -h, --help      output usage information \n");
} else { 
    var password = process.argv[2];
    if ( password && typeof password === 'string') {
        properties.keystorepass = process.argv[2];
        fs.writeFile(propertiesFile, JSON.stringify(properties, null, 4), 'utf-8', function (err) {
            if (err) console.log("Error updating project.json :(\n" + err);
            process.exit();
        });
    } else {
        console.log("Password is required.  Usage: keystorepass <password> ");
    }
}
