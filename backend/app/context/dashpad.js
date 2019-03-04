const { UIEventType } = require('../constants');
const _ = require('lodash');
const path = require('path');
const FileManager = require('../../libs/file-manager');
const PathHelper = require('../helpers/path-helper');
let _state = {};
let process_namespace = '';
module.exports = context => {
    const { settings, state, version } = context;
    process_namespace = state.packageInfo.namespace;
    _state = state;
    return {
        settings,
        version,
        _replaceState: state => (_state = state),
        getState: (keyPath) => _.get(_state.uischema, keyPath),
        setState: payload => {
            if (_state.packageInfo.namespace === process_namespace) {
                const action = {
                    type: UIEventType.UPDATE_UI_STATE,
                    payload,
                };
                process.send(action);
            }
        },
        showNotification: ({ title, message }) => {
            const action = {
                type: UIEventType.SHOW_NOTIFICATION,
                payload: { title, message },
            };
            process.send(action);
        },
        showToast: ({ message, options }) => {
            const action = {
                type: UIEventType.SHOW_TOAST,
                payload: { message, options },
            };
            process.send(action);
        },
        showModal: ({ title, message, onConfirm, variant, className }) => {
            const action = {
                type: UIEventType.SHOW_MODAL,
                payload: {
                    title,
                    message,
                    onConfirm,
                    variant,
                    className,
                },
            };
            process.send(action);
        },
        loadJson: file => {
            const {packageName} = state.packageInfo
            const jsonPath = [PathHelper.getPackagePath(packageName), file].join('/');
            return FileManager.loadJson(path.resolve(jsonPath));
        },
        exit: () => process.exit(0)
    };
};
