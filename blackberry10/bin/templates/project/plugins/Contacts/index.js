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
    contactUtils = require("./contactUtils"),
    contactConsts = require("./contactConsts"),
    ContactError = require("./ContactError"),
    noop = function () {};

function getAccountFilters(options) {
    if (options.includeAccounts) {
        options.includeAccounts = options.includeAccounts.map(function (acct) {
            return acct.id.toString();
        });
    }

    if (options.excludeAccounts) {
        options.excludeAccounts = options.excludeAccounts.map(function (acct) {
            return acct.id.toString();
        });
    }
}

module.exports = {
    search: function (successCb, failCb, args, env) {
        console.log("search is called");
        var findOptions = {},
            cordovaFindOptions = {},
            result,
            key;

        for (key in args) {
            if (args.hasOwnProperty(key)) {
                cordovaFindOptions[key] = JSON.parse(decodeURIComponent(args[key]));
            }
        }

        result = new PluginResult(args, env);
        findOptions._eventId = cordovaFindOptions.callbackId;
        findOptions.fields = cordovaFindOptions[0];
        findOptions.options = cordovaFindOptions[1];

        if (!contactUtils.validateFindArguments(findOptions.options)) {
            result.callbackError({
                "result": escape(JSON.stringify({
                    "_success": false,
                    "code": ContactError.INVALID_ARGUMENT_ERROR
                }))
            });
            result.noResult(true);
            return;
        }

        getAccountFilters(findOptions.options);
        pimContacts.getInstance().find(findOptions, result);

        result.noResult(true);
    },
    save: function (successCb, failCb, args, env) {
        var attributes = {},
            cordovaAttributes = {},
            result = new PluginResult(args, env),
            key;

        for (key in args) {
            if (args.hasOwnProperty(key)) {
                cordovaAttributes[key] = JSON.parse(decodeURIComponent(args[key]));
            }
        }
        attributes = cordovaAttributes[0];

        //convert birthday format for our native .so file
        if (attributes.birthday) {
            attributes.birthday = new Date(attributes.birthday).toDateString();
        }

        attributes["_eventId"] = cordovaAttributes.callbackId;
        pimContacts.getInstance().save(attributes, result);
        result.noResult(true);
    },
    remove: function (successCb, failCb, args, env) {
        var attributes = {
                "contactId": window.parseInt(JSON.parse(decodeURIComponent(args[0]))),
                "_eventId": JSON.parse(decodeURIComponent(args.callbackId));
            },
            result = new PluginResult(args, env);

        if (!window.isNaN(attributes.contactId)) {
            pimContacts.getInstance().remove(attributes, result);
            result.noResult(true);
        } else {
            result.callbackError(ContactError.UNKNOWN_ERROR);
            result.noResult(false);
        }
    }
}

///////////////////////////////////////////////////////////////////
// JavaScript wrapper for JNEXT plugin
///////////////////////////////////////////////////////////////////

JNEXT.PimContacts = function ()
{
    var self = this,
        hasInstance = false;

    self.find = function (args, pluginResult) {
        self.eventHandlers[args._eventId] = pluginResult;
        JNEXT.invoke(self.m_id, "find " + JSON.stringify(args));
        return "";
    };

    self.getContact = function (args) {
        return JSON.parse(JNEXT.invoke(self.m_id, "getContact " + JSON.stringify(args)));
    };

    self.save = function (args, pluginResult) {
        self.eventHandlers[args._eventId] = pluginResult;
        JNEXT.invoke(self.m_id, "save " + JSON.stringify(args));
        return "";
    };

    self.remove = function (args, pluginResult) {
        self.eventHandlers[args._eventId] = pluginResult;
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

    self.onEvent = function (strData) {
        var arData = strData.split(" "),
            strEventDesc = arData[0],
            args = {};

        if (strEventDesc === "result") {
            args.result = escape(strData.split(" ").slice(2).join(" "));
            self.eventHandlers[arData[1]].callbackOk(JSON.parse(decodeURIComponent(args.result)), false);
        }
    };

    self.m_id = "";
    self.eventHandlers = {};

    self.getInstance = function () {
        if (!hasInstance) {
            self.init();
            hasInstance = true;
        }
        return self;
    };
};

pimContacts = new JNEXT.PimContacts();
