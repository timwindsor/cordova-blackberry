/*
 * Copyright 2013 Research In Motion Limited.
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

describe("Contacts", function () {
    var _apiDir = __dirname + "./../../../templates/project/plugins/Contacts/",
        index,
        result = {
            noResult: jasmine.createSpy("PluginResult.noResult"),
            error: jasmine.createSpy("PluginResult.error"),
            ok: jasmine.createSpy("PluginResult.ok"),
            callbackError: jasmine.createSpy("PluginResult.callbackError"),
            callbackOk: jasmine.createSpy("PluginResult.callbackOk")
        };

    beforeEach(function () {
        GLOBAL.JNEXT = {
            require: jasmine.createSpy("JNEXT.require").andCallFake(function () {
                return true;
            }),
            createObject: jasmine.createSpy("JNEXT.createObject").andCallFake(function () {
                return 123;
            }),
            invoke: jasmine.createSpy("JNEXT.invoke").andCallFake(function () {
                return JSON.stringify({
                    _success: true,
                    contact: { id: "123" }
                });
            }),
            registerEvents: jasmine.createSpy("JNEXT.regsiterEvents")
        };
        GLOBAL.PluginResult = function () {
            return result;
        };
        index = require(_apiDir + "index");
        GLOBAL.window = {
            parseInt: jasmine.createSpy("window.parseInt"),
            isNaN: jasmine.createSpy("window.isNaN")
        };
    });

    afterEach(function () {
        index = null;
        delete GLOBAL.JNEXT;
        delete GLOBAL.window;
    });

    describe("remove", function () {
        it("calls JNEXT with the correct params for valid contactId", function () {
            var args = {
                "0": encodeURIComponent(JSON.stringify(123)),
                "callbackId": encodeURIComponent(JSON.stringify("Contacts23424"))
            };
            window.parseInt.andCallFake(function () {
                return 123;
            });
            index.remove(function () {}, function () {}, args, {});
            expect(JNEXT.invoke).toHaveBeenCalledWith(123, 'remove {"contactId":123,"_eventId":"Contacts23424"}');
            expect(result.noResult).toHaveBeenCalledWith(true);
        });
        it("calls callbackError if invalid ID", function () {
            var args = {
                "0": encodeURIComponent(JSON.stringify("asdfas")),
                "callbackId": encodeURIComponent(JSON.stringify("Contacts23424"))
            };
            window.isNaN.andCallFake(function() {
                return true;
            });
            index.remove(function () {}, function () {}, args, {});
            expect(result.callbackError).toHaveBeenCalled();
            expect(result.noResult).toHaveBeenCalled();
        });
    });
});
