const { UIEventType } = require('../constants');
const _ = require('lodash');
const Config = require('../../configs/config');
const BackendStore = require('../store');
const uischemaKeyPath = 'app.uischema';
const Octokit = require('@octokit/rest');
let _isBrowser = false;

class DashpahApi {
    constructor({ dispatch, state, isBrowser }) {
        _isBrowser = isBrowser
        BackendStore.init(state);
        this.dispatch = dispatch;
        const packageInfo = state.app.packageInfo;
        if (packageInfo) {
            const { packageName, namespace } = packageInfo;
            this.process_namespace = namespace;
            this.packageName = packageName;
        }
        this.settings = {
            set: (keyPath, value) => {
                Config.set(`settings.${this.packageName}.${keyPath}`, value);
                return Config.get(`settings.${this.packageName}`);
            },
            get: keyPath => {
                return Config.get(`settings.${this.packageName}.${keyPath}`);
            },
            push: (keyPath, value) => {
                Config.push(`settings.${this.packageName}.${keyPath}`, value);
                return Config.get(`settings.${this.packageName}`);
            },
            delete: keyPath => {
                Config.delete(`settings.${this.packageName}.${keyPath}`);
                return Config.get(`settings.${this.packageName}`);
            },
            value: () => Config.value().settings,
        };
        this.initPlatforms();
    }
    initPlatforms() {
        const { github } = Config.value().settings.platform;
        if (github.authToken) {
            const Github = new Octokit({
                auth: `token ${github.authToken}`,
                baseUrl: github.api,
                previews: ['mercy-preview']
            });
            this.platform = {
                Github
            }
        }



    }
    updatePackageInfo(packageInfo) {
        if (packageInfo) {
            const { packageName, namespace } = packageInfo;
            this.process_namespace = namespace;
            this.packageName = packageName;
        }
    }
    send(action) {
        if (_isBrowser) {
            this.dispatch(action);
        } else {
            process.send(action);
        }
    }

    setState() {
        const namespace = BackendStore.get('app.packageInfo.namespace');
        if (_isBrowser || namespace === this.process_namespace) {
            const payload = _.isString(arguments[0])
                ? { keyPath: arguments[0], value: arguments[1] }
                : arguments[0];
            const payloadArr = _.isPlainObject(payload) ? [payload] : payload;

            const action = {
                type: UIEventType.UPDATE_UI_STATE,
                payload: payloadArr,
            };
            this.send(action);
        }
    }

    getState(keyPath) {
        return BackendStore.get(`${uischemaKeyPath}.${keyPath}`);
    }

    getVars(keyPath) {
        return this.getState(this.getVarsRaw(keyPath));
    }

    getVarsRaw(keyPath) {
        return BackendStore.get(`${uischemaKeyPath}.$vars.${keyPath}`);
    }

    setVars() {
        const payload = _.isString(arguments[0])
            ? { keyPath: arguments[0], value: arguments[1] }
            : arguments[0];
        const payloadArr = _.isPlainObject(payload) ? [payload] : payload;
        const actions = payloadArr.map(obj => {
            const keyPath = this.getVarsRaw(obj.keyPath);
            return {
                keyPath,
                value: obj.value,
            };
        });
        this.setState(actions);
    }

    showNotification({ title, message }) {
        const action = {
            type: UIEventType.SHOW_NOTIFICATION,
            payload: { title, message },
        };
        this.send(action);
    }

    showToast({ message, options }) {
        const action = {
            type: UIEventType.SHOW_TOAST,
            payload: { message, options },
        };
        this.send(action);
    }

    showModal({ title, message, onConfirm, variant, className }) {
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
        this.send(action);
    }
    copyToClipboard(text) {
        const action = {
            type: UIEventType.COPY_TO_CLIPBOARD,
            payload: {
                text,
            },
        };
        this.send(action);
    }
    run(script, params) {
        const action = {
            type: UIEventType.RUN_CHILD_PROCESS,
            payload: {
                script,
                params,
            },
        };
        this.send(action);
    }
    kill(pid) {
        const action = {
            type: UIEventType.KILL_CHILD_PROCESS,
            payload: {
                pid,
            },
        };
        this.send(action);
    }

    exit() {
        process && process.exit(0);
    }
}

module.exports = DashpahApi;
