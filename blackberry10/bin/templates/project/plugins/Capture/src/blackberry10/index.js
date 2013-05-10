/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

function capture(action, result, webview) {
    var noop = function () {},
        fail = function (error) {
            result.callbackError(error);
        };

    blackberry.invoke.card.invokeCamera(action, function (path) {
        var sb = webview.getSandbox();
        webview.setSandbox(false);
        window.webkitRequestFileSystem(window.PERSISTENT, 1024, function (fs) {
            fs.root.getFile(path, {}, function (fe) {
                fe.file(function (file) {
                    file.fullPath = fe.fullPath;
                    webview.setSandbox(sb);
                    result.callbackOK([file]);
                }, fail);
            }, fail);
        }, fail);
    }, noop, noop);

    result.noResult(true);
}

module.exports = {
    getSupportedAudioModes: function (success, fail, args, env) {
        var result = new PluginResult(args, env);
        result.ok([]);
    },
    getSupportedImageModes: function (win, fail, args, env) {
        var result = new PluginResult(args, env);
        result.ok([]);
    },
    getSupportedVideoModes: function (win, fail, args, env) {
        var result = new PluginResult(args, env);
        result.ok([]);
    },
    captureImage: function (win, fail, args, env) {
        var result = new PluginResult(args, env);

        if (args[0].limit > 0) {
            capture("photo", result, env.webview);
        }
        else {
            result.ok([]);
        }
    },
    captureVideo: function (win, fail, args, env) {
        var result = new PluginResult(args, env);

        if (args[0].limit > 0) {
            capture("video", result, env.webview);
        }
        else {
            result.ok([]);
        }
    },
    captureAudio: function (win, fail, args, env) {
        var result = new PluginResult(args, env);
        result.error("Capturing Audio not supported");
    }
};
