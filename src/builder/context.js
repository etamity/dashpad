import VM from 'libs/VM';
import React from 'react';
import { AppAction } from 'reducers/app';
import { Store } from 'App';
import { toast } from 'react-toastify';
import Native from 'libs/Native';
import _ from 'lodash';
const { shell } = require('electron');
const vm = new VM();

const { ProcessManager, Notifier, PathHelper, ContentLoader, Config } = Native();

const getUIschema = () => Store.getState().app.uischema;

/**
 *
 * @param {Array || Object} payload
 * Array [{keyPath: 'some.key.path', value: 'some value'}]
 * Objecr {keyPath: 'some.key.path', value: 'some value'}
 */
const setUISchema = payload => {
    AppAction.updateUIState(payload);
};

const run = (script, parameters) => {
    const job = ProcessManager.start(script, parameters);
    return job;
};

const kill = pid => {
    ProcessManager.kill(pid);
};

/**
 * 
 * @param {*} text Copy text to clipboard 
 */
const copyToClipboard = (text) => {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        let textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

/**
 * Global Dashpad api for yaml frontend
 */
const Dashpad = {
    getState: (keyPath) => {
        return _.get(getUIschema(), keyPath);
    },
    getVars: (key) => {
        const state = getUIschema();
        const keyPath = _.get(state, `$vars.${key}`);
        return keyPath && _.get(state, keyPath);
    },
    setVars: (...args) => {
        const payload = _.isString(args[0]) ? {keyPath: args[0], value: args[1]}: args[0];
        const payloadArr = _.isPlainObject(payload) ? [payload]: payload;
        const actions = payloadArr.map(obj => {
            const state = getUIschema();
            const keyPath = _.get(state, `$vars.${obj.keyPath}`);
            return {
                keyPath,
                value: obj.value
            }
        });
        setUISchema(actions); 
    },
    setState: setUISchema,
    showToast: ({ message, options }) => {
        const defaultOptions = {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.INFO,
        };
        toast(message, Object.assign({}, defaultOptions, options));
    },
    run,
    loadJs: file => {
        const uiPath = [PathHelper.getCurrentDashSpace(), file].join('/');
        ContentLoader.loadScript(uiPath).then(file => {
            vm.run(file);
        });
    },
    loadJson: file => {
        const jsonPath = [PathHelper.getCurrentDashSpace(), file].join('/');
        return ContentLoader.loadJson(jsonPath);
    },
    kill,
    showNotification: params => {
        Notifier.notify(params);
    },
    shell,
    showModal: modal => AppAction.showModal(modal),
    copyToClipboard,
    settings: {
        set: (keyPath, value) => {
            const {packageName} = Store.getState().app.packageInfo;
            Config.set(`settings.${packageName}.${keyPath}`, value);
            return Config.get(`settings.${packageName}`);
        },
        get: (keyPath) => {
            const {packageName} = Store.getState().app.packageInfo;
            return Config.get(`settings.${packageName}.${keyPath}`);
        },
        push: (keyPath, value) => {
            const {packageName} = Store.getState().app.packageInfo;
             Config.push(`settings.${packageName}.${keyPath}`, value);
            return Config.get(`settings.${packageName}`);
        },
        delete: (keyPath) => {
            const {packageName} = Store.getState().app.packageInfo;
            Config.delete(`settings.${packageName}.${keyPath}`);
            return Config.get(`settings.${packageName}`);
        },
        value: () => {
            return Config.value()
        }
    },
};

vm.addGlobal('Dashpad', Dashpad);
vm.addGlobal('loadJs', Dashpad.loadJs);

export default {
    vm,
}
