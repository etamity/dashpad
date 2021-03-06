const { UIEventType, AppEventType } = require('../constants');
const _ = require('lodash');
const Config = require('@dashpad/config');
const BackendStore = require('../store');
const uischemaKeyPath = 'app.uiSchema';
const { Octokit } = require("@octokit/rest");
const jenkinsapi = require('./platforms/jenkins-api');
let _isBrowser = false;

class DashpahApi {
    constructor({ dispatch, state, isBrowser }) {
        _isBrowser = isBrowser;
        BackendStore.init(state);
        this.dispatch = dispatch;
        const packageInfo = state.app.packageInfo;
        this.packageInfo = packageInfo;
        if (packageInfo) {
            const { packageName, namespace } = packageInfo;
            this.process_namespace = namespace;
            this.packageName = packageName;
        }
        this.settings = {
            set: (keyPath, value) => {
                return _.isString(keyPath)
                    ? Config.set(
                          `settings.plugins.${this.getSettingKey()}.${keyPath}`,
                          value
                      )
                    : Config.set(`settings.plugins.${this.getSettingKey()}`, keyPath);
            },
            get: keyPath => {
                return keyPath
                    ? Config.get(`settings.plugins.${this.getSettingKey()}.${keyPath}`)
                    : Config.get(`settings.plugins.${this.getSettingKey()}`);
            },
            push: (keyPath, value) => {
                Config.push(
                    `settings.plugins.${this.getSettingKey()}.${keyPath}`,
                    value
                );
                return Config.get(`settings.plugins.${this.getSettingKey()}`);
            },
            delete: keyPath => {
                const aKeyPath = `settings.plugins.${this.getSettingKey()}`;
                Config.delete(`${aKeyPath}.${keyPath}`);
            },
            value: () => Config.value().settings,
        };
        this.platform = {};
        this.utils = require('./utils/index');
        this.initPlatforms();
    }
    getSettingKey() {
        return this.packageName.replace('/', '.');
    }
    initPlatforms() {
        const { settings } = Config.value();
        const github = Config.getPlatform('github');
        const { credential } = settings;
        if (github && github.authtoken && github.endpoint) {
            const Github = new Octokit({
                auth: `token ${github.authtoken}`,
                userAgent: 'Dashpad',
                baseUrl: github.endpoint,
                previews: ['mercy-preview'],
            });
            this.platform['Github'] = Github;
        }
        const JenkinsConnect = url => {
            const jenkinsUrl = new URL(url);
            jenkinsUrl.username = credential.username;
            jenkinsUrl.password = credential.password;
            return jenkinsapi.init(jenkinsUrl.href);
        };
        this.platform['JenkinsConnect'] = JenkinsConnect;
        const { jenkins } = settings.platform;
        if (jenkins && jenkins.endpoint) {
            this.platform['Jenkins'] = JenkinsConnect(jenkins.endpoint);
        }
        return this.platform;
    }
    updatePackageInfo(packageInfo) {
        if (packageInfo) {
            const { packageName, namespace } = packageInfo;
            this.process_namespace = namespace;
            this.packageName = packageName;
            this.packageInfo = packageInfo;
        }
    }
    terminal() {
        const args = [].slice.call(arguments);
        const action = {
            type: UIEventType.LOGS_MESSAGES,
            payload: args.join(' '),
        };
        this.send(action);
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
        const namespace = BackendStore.get('app.packageInfo.namespace');
        const pluginPath = `${uischemaKeyPath}.${namespace}`;
        return BackendStore.get(`${pluginPath}.${keyPath}`);
    }

    getVarsState(keyPath) {
        return this.getState(this.getVars(keyPath));
    }

    getVars(keyPath) {
        const namespace = BackendStore.get('app.packageInfo.namespace');
        const pluginPath = `${uischemaKeyPath}.${namespace}`;
        return BackendStore.get(`${pluginPath}.$vars.${keyPath}`);
    }

    setVars() {
        const namespace = BackendStore.get('app.packageInfo.namespace');
        if (_isBrowser || namespace === this.process_namespace) {
            const payload = _.isString(arguments[0])
                ? { keyPath: `${arguments[0]}`, value: arguments[1] }
                : arguments[0];
            const payloadArr = _.isPlainObject(payload) ? [payload] : payload;

            const action = {
                type: UIEventType.UPDATE_UI_STATE_BY_VARS,
                payload: payloadArr,
            };
            this.send(action);
        }
    }

    setVarsState() {
        const payload = _.isString(arguments[0])
            ? { keyPath: arguments[0], value: arguments[1] }
            : arguments[0];
        const payloadArr = _.isPlainObject(payload) ? [payload] : payload;
        const actions = payloadArr.map(obj => {
            const keyPath = this.getVars(obj.keyPath);
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

    showToast() {
        const payload = _.isString(arguments[0])
            ? { message: arguments[0], options: arguments[1] }
            : arguments[0];

        const action = {
            type: UIEventType.SHOW_TOAST,
            payload,
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
    goto(gotoPath, vars) {
        const filePath = BackendStore.get('app.packageInfo.filePath');
        const dir = filePath.substring(
            0,
            filePath.lastIndexOf('_dash/') + 6
        );
        const uiPath = dir + gotoPath;
        const action = {
            type: AppEventType.ON_LOAD_UI,
            payload: { filePath: uiPath, vars },
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

    exit(delay) {
        setTimeout(() => {
            process && process.exit(0);
        }, delay || 1000);
    }

    log() {
        if (_isBrowser) {
            console.log(arguments);
        } else {
            const action = {
                type: UIEventType.CONSOLE_LOG,
                payload: arguments,
            };
            this.send(action);
        }
    }
}

module.exports = DashpahApi;
