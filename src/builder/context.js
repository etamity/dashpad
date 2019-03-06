import VM from 'libs/VM';
import React from 'react';
import { AppAction } from 'reducers/app';
import { Store } from 'App';
import { toast } from 'react-toastify';
import Native from 'libs/Native';
import _ from 'lodash';
const { shell } = require('electron');
const vm = new VM();

const { ProcessManager, Notifier, PathHelper, ContentLoader } = Native();

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
        let key = _.get(getUIschema(), `$vars.${keyPath}`)
        return _.get(getUIschema(), key || keyPath);
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
};

vm.addGlobal('Dashpad', Dashpad);
vm.addGlobal('loadJs', Dashpad.loadJs);

export default {
    vm,
}
