/*
 * Copyright 2010-2011 Research In Motion Limited.
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
var audioObjects = {};

module.exports = {
    create: function (success, fail, args, env) {
        var id = JSON.parse(decodeURIComponent(args[0])),
            src = JSON.parse(decodeURIComponent(args[1])),
            pluginResult = new PluginResult(args, env);

        if (typeof src == "undefined"){
            audioObjects[id] = new Audio();
        } else {
            audioObjects[id] = new Audio(src);
        }

        //return {"status" : 1, "message" : "Audio object created" };
        pluginResult.ok(null, false);
    },

    startPlayingAudio: function (success, fail, args, env) {
        var id = JSON.parse(decodeURIComponent(args[0])),
            audio = audioObjects[id],
            result,
            pluginResult = new PluginResult(args, env);

        //if (args.length === 1 || typeof args[1] == "undefined" ) {
          //  return {"status" : 9, "message" : "Media source argument not found"};
        //}

        if (audio) {
            audio.pause();
            audioObjects[id] = undefined;
        }

        audio = audioObjects[id] = new Audio(JSON.parse(decodeURIComponent(args[1])));
        audio.play();
        //return {"status" : 1, "message" : "Audio play started" };
        pluginResult.ok(null, false);
    },

    stopPlayingAudio: function (success, fail, args, env) {
        //if (!args.length) {
          //  return {"status" : 9, "message" : "Media Object id was not sent in arguments"};
        //}

        var id = JSON.parse(decodeURIComponent(args[0])),
            audio = audioObjects[id],
            result,
            pluginResult = new PluginResult(args, env);

        //if (!audio) {
          //  return {"status" : 2, "message" : "Audio Object has not been initialized"};
        //}
        if (!audio) {
            pluginResult.error("Audio Object has not been initialized", false);
            return;
        }

        audio.pause();
        audioObjects[id] = undefined;

        //return {"status" : 1, "message" : "Audio play stopped" };
        pluginResult.ok(null, false);
    },

    seekToAudio: function (success, fail, args, env) {
        //if (!args.length) {
          //  return {"status" : 9, "message" : "Media Object id was not sent in arguments"};
        //}

        var id = JSON.parse(decodeURIComponent(args[0])),
            audio = audioObjects[id],
            result,
            pluginResult = new PluginResult(args, env);

        if (!audio) {
            //result = {"status" : 2, "message" : "Audio Object has not been initialized"};
            pluginResult.error("Audio Object has not been initialized", false);
        } else if (args.length === 1) {
            //result = {"status" : 9, "message" : "Media seek time argument not found"};
            pluginResult.error("Media seek time argument not found", false);
        } else {
            try {
                audio.currentTime = args[1];
            } catch (e) {
                console.log('Error seeking audio: ' + e);
                //return {"status" : 3, "message" : "Error seeking audio: " + e};
                pluginResult.error("Error seeking audio: " + e, false);
                return;
            }

            //result = {"status" : 1, "message" : "Seek to audio succeeded" };
            pluginResult.ok(null, false);
        }
        //return result;
    },

    pausePlayingAudio: function (success, fail, args, env) {
        //if (!args.length) {
          //  return {"status" : 9, "message" : "Media Object id was not sent in arguments"};
        //}

        var id = JSON.parse(decodeURIComponent(args[0])),
            audio = audioObjects[id],
            result,
            pluginResult = new PluginResult(args, env);

        if (!audio) {
            //return {"status" : 2, "message" : "Audio Object has not been initialized"};
            pluginResult.error("Audio Object has not been initialized", false);
            return;
        }

        audio.pause();

        //return {"status" : 1, "message" : "Audio paused" };
        pluginResult.ok(null, false);
    },

    getCurrentPositionAudio: function (success, fail, args, env) {
        //if (!args.length) {
          //  return {"status" : 9, "message" : "Media Object id was not sent in arguments"};
        //}

        var id = JSON.parse(decodeURIComponent(args[0])),
            audio = audioObjects[id],
            result,
            pluginResult = new PluginResult(args, env);

        if (!audio) {
            //return {"status" : 2, "message" : "Audio Object has not been initialized"};
            pluginResult.error("Audio Object has not been initialized", false);
            return;
        }

        //return {"status" : 1, "message" : audio.currentTime };
        pluginResult.ok(audio.currentTime, false);
    },
/*
    getDuration: function (success, fail, args, env) {
        //if (!args.length) {
          //  return {"status" : 9, "message" : "Media Object id was not sent in arguments"};
        //}

        var id = JSON.parse(decodeURIComponent(args[0])),
            audio = audioObjects[id],
            result,
            pluginResult = new PluginResult(args, env);

        if (!audio) {
            //return {"status" : 2, "message" : "Audio Object has not been initialized"};
            pluginResult.error("Audio Object has not been initialized", false);
            return;
        }

        //return {"status" : 1, "message" : audio.duration };
    },
*/

    startRecordingAudio: function (success, fail, args, env) {
        //if (!args.length) {
          //  return {"status" : 9, "message" : "Media Object id was not sent in arguments"};
        //}

        //if (args.length <= 1) {
          //  return {"status" : 9, "message" : "Media start recording, insufficient arguments"};
        //}

        //blackberry.media.microphone.record(args[1], win, fail);
        //return { "status" : cordova.callbackStatus.NO_RESULT, "message" : "WebWorks Is On It" };
        var pluginResult = new PluginResult(args, env);
        pluginResult.error("Not supported", false);
    },

    stopRecordingAudio: function (success, fail, args, env) {
        var pluginResult = new PluginResult(args, env);
        pluginResult.error("Not supported", false);
    },

    release: function (success, fail, args, env) {
        //if (!args.length) {
          //  return {"status" : 9, "message" : "Media Object id was not sent in arguments"};
        //}

        var id = JSON.parse(decodeURIComponent(args[0])),
            audio = audioObjects[id],
            result,
            pluginResult = new PluginResult(args, env);

        if (audio) {
            if(audio.src !== ""){
                audio.src = undefined;
            }
            audioObjects[id] = undefined;
            //delete audio;
        }

        //result = {"status" : 1, "message" : "Media resources released"};
        pluginResult.ok(null, false);
        //return result;
    }

    // takePicture: function (success, fail, args, env) {
    //     var destinationType = JSON.parse(decodeURIComponent(args[1])),
    //         sourceType = JSON.parse(decodeURIComponent(args[2])),
    //         result = new PluginResult(args, env),
    //         done = function (data) {
    //             if (destinationType === DestinationType.FILE_URI) {
    //                 data = "file://" + data;
    //                 result.callbackOk(data, false);
    //             } else {
    //                 encodeBase64(data, function (data) {
    //                     if (/^data:/.test(data)) {
    //                         data = data.slice(data.indexOf(",") + 1);
    //                         result.callbackOk(data, false);
    //                     } else {
    //                         result.callbackError(data, false);
    //                     }
    //                 });
    //             }
    //         },
    //         cancel = function (reason) {
    //             result.callbackError(reason, false);
    //         },
    //         invoked = function (error) {
    //             if (error) {
    //                 result.callbackError(error, false);
    //             }
    //         };

    //     switch(sourceType) {
    //     case PictureSourceType.CAMERA:
    //         window.qnx.webplatform.getApplication().cards.camera.open("photo", done, cancel, invoked);
    //         break;

    //     case PictureSourceType.PHOTOLIBRARY:
    //     case PictureSourceType.SAVEDPHOTOALBUM:
    //         window.qnx.webplatform.getApplication().cards.filePicker.open({
    //             mode: "Picker",
    //             type: ["picture"]
    //         }, done, cancel, invoked);
    //         break;
    //     }

    //     result.noResult(true);
    // }
};
