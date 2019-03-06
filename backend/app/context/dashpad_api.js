const { UIEventType } = require('../constants');
const _ = require('lodash');
const path = require('path');
const Config = require('../../configs/config');
const FileManager = require('../../libs/file-manager');
const PathHelper = require('../helpers/path-helper');
let _state = {};
let process_namespace = '';

const setState = payload => {
    if (_state.packageInfo.namespace === process_namespace) {
        const action = {
            type: UIEventType.UPDATE_UI_STATE,
            payload,
        };
        process.send(action);
    }
}
const getState= (keyPath) => _.get(_state.uischema, keyPath);

module.exports = context => {
    const { state, version } = context;
    process_namespace = state.packageInfo.namespace;
    const {packageName} = state.packageInfo;
    _state = state;
    return {
        settings: {
            set: (keyPath, value) => {
                Config.set(`settings.${packageName}.${keyPath}`, value);
                return Config.get(`settings.${packageName}`);
            },
            get: (keyPath) => {
                return Config.get(`settings.${packageName}.${keyPath}`);
            },
            push: (keyPath, value) => {
                Config.push(`settings.${packageName}.${keyPath}`, value);
                return Config.get(`settings.${packageName}`);
            },
            delete: (keyPath) => {
                Config.delete(`settings.${packageName}.${keyPath}`);
                return Config.get(`settings.${packageName}`);
                
            },
            value: () => Config.value().settings
        },
        version,
        _replaceState: state => (_state = state),
        getVars: (key) => {
            const keyPath = _.get(_state, `$vars.${key}`);
            return getState(keyPath);
        },
        setVars: (payload) => {
            const payloadArr = _.isPlainObject(payload) ? [payload]: payload;
            const actions = payloadArr.map(obj => {
                const keyPath = _.get(_state, `$vars.${obj.keyPath}`);
                return {
                    keyPath,
                    value: obj.value
                }
            });
            setState(actions); 
        },
        getState,
        setState,
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
        
            const jsonPath = [PathHelper.getPackagePath(packageName), file].join('/');
            return FileManager.loadJson(path.resolve(jsonPath));
        },
        exit: () => process.exit(0)
    };
};
