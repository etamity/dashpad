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
 * Global Dashpad api for yaml frontend
 */
const Dashpad = {
    getState: (keyPath) => {
        return _.get(getUIschema(), keyPath);
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
    kill,
    showNotification: params => {
        Notifier.notify(params);
    },
    shell,
    showModal: modal => AppAction.showModal(modal),
};

vm.addGlobal('Dashpad', Dashpad);
vm.addGlobal('loadJs', Dashpad.loadJs);

export default React.createContext({
    vm,
});
