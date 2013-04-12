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
var pimContacts,
    noop = function () {};

module.exports = {
    find: function (successCb, failCb, args, env) {
        noop();
    },
    save: function (successCb, failCb, args, env) {
        noop();
    },
    remove: function (successCb, failCb, args, env) {
        noop();
    }
}

///////////////////////////////////////////////////////////////////
// JavaScript wrapper for JNEXT plugin
///////////////////////////////////////////////////////////////////

JNEXT.PimContacts = function ()
{
    var self = this,
        hasInstance = false;

    self.find = function (args) {
        JNEXT.invoke(self.m_id, "find " + JSON.stringify(args));
        return "";
    };

    self.save = function (args) {
        JNEXT.invoke(self.m_id, "save " + JSON.stringify(args));
        return "";
    };

    self.remove = function (args) {
        JNEXT.invoke(self.m_id, "remove " + JSON.stringify(args));
        return "";
    };

    self.getId = function () {
        return self.m_id;
    };

    self.getContactAccounts = function () {
        var value = JNEXT.invoke(self.m_id, "getContactAccounts");
        return JSON.parse(value);
    };

    self.init = function () {
        if (!JNEXT.require("libpimcontacts")) {
            return false;
        }

        self.m_id = JNEXT.createObject("libpimcontacts.PimContacts");

        if (self.m_id === "") {
            return false;
        }

        JNEXT.registerEvents(self);
    };

    self.m_id = "";

    self.getInstance = function () {
        if (!hasInstance) {
            self.init();
            hasInstance = true;
        }
        return self;
    };
};

pimContacts = new JNEXT.PimContacts();
