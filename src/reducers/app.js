import { RouteBuilder, NavBuilder } from 'libs/NavsBuilder.js';
import immutable from 'object-path-immutable';
import * as Plugins from 'plugins';
import Native from 'libs/Native';
import { Store } from 'store';
import _ from 'lodash';
import { toast } from 'react-toastify';
const {
    Constants,
    BackendStore,
    ProcessManager,
    Notifier,
} = Native();
const { AppEventType, UIEventType, ProcessEventType } = Constants;

const currentRoute = (routes, pathname) => {
    return (
        routes &&
        routes.find(route => {
            return pathname.includes(route.path);
        })
    );
};
const config = NavBuilder(Plugins);

const routes = RouteBuilder(Plugins);

const current = (hash = window.location.hash) => {
    const route = currentRoute(routes, hash);
    return {
        route,
    };
};

const initState = {
    config,
    routes,
    current: {
        ...current()
    },
    uischema: null,
    packageInfo: null,
    modal: [],
    processes: [],
};

BackendStore.set('app', JSON.parse(JSON.stringify(initState)));

const syncBackendAndChildProcessState = state => {
    const action = {
        type: ProcessEventType.UPDATE_MODULE_STATE,
        payload: state,
    };
    ProcessManager.send(action);
    BackendStore.set('app', JSON.parse(JSON.stringify(state)));
};

/**
 *
 * @param {string} keyPath The state path string
 * @param {*} value Update value
 * @param {*} state Initial state
 */
const updateUIState = (keyPath, value, state) => {
    let schemaKey = 'uischema';
    if (keyPath.charAt(0) !== '.') {
        schemaKey = schemaKey + '.' + keyPath;
    } else {
        schemaKey = schemaKey + keyPath;
    }
    return immutable(state)
        .set(schemaKey, value)
        .value();
};

/**
 *
 * @param {*} text Copy text to clipboard
 */
const copyToClipboard = text => {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', text);
    } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported('copy')
    ) {
        let textarea = document.createElement('textarea');
        textarea.textContent = text;
        textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand('copy'); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn('Copy to clipboard failed.', ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
};

export default function update(state = initState, action) {
    let newState = state;
    const { type, payload } = action;
    switch (type) {
        case '@@router/LOCATION_CHANGE':
            const { hash } = payload.location;
            newState = immutable(state)
                .merge('current', current(hash))
                .value();
            break;
        case AppEventType.ON_LOAD_NAVS:
            const { navs } = payload;
            newState = immutable(state)
                .set(
                    'config.SideMenus.items',
                    config.SideMenus.items.concat(navs)
                )
                .value();
            break;
        case AppEventType.ON_LOAD_UI:
            const { ymlPath } = payload;
            const { ContentHelper } = Native();
            const uischema = ContentHelper.loadJson(ymlPath);
            const packageInfo = updatePackageInfo(ymlPath);
            newState = immutable(state)
                .set('uischema', uischema)
                .value();
            newState = immutable(newState)
                .set('packageInfo', packageInfo)
                .value();
            break;
        case UIEventType.UPDATE_UI_STATE:
            if (_.isArray(payload)) {
                const stateArr = payload;

                newState = stateArr.reduce((root, next) => {
                    const { keyPath, value } = next;
                    return updateUIState(keyPath, value, root);
                }, state);
            } else {
                const { keyPath, value } = payload;
                newState = updateUIState(keyPath, value, state);
            }

            break;
        case AppEventType.ON_LOAD_PROCESSES_CHILD:
            const { children } = payload;
            newState = immutable(state)
                .set('processes', children)
                .value();
            break;

        case AppEventType.ON_BACKEND_ERROR:
            const { msg } = payload;
            const errMsg = `Error: Schema failed to parse !\n ${msg}`;
            console.error(errMsg);
            toast.error(errMsg, {
                position: toast.POSITION.TOP_RIGHT,
            });
            break;
        case UIEventType.SHOW_MODAL:
            newState = immutable(state)
                .push('modal', payload)
                .value();
            break;
        case UIEventType.CLOSE_MODAL:
            const modal = state.modal;
            newState = immutable(state)
                .del(`modal.${modal.length - 1}`)
                .value();
            break;
        case UIEventType.SHOW_TOAST:
            const { message, options } = payload;
            const defaultOptions = {
                position: toast.POSITION.TOP_CENTER,
                type: toast.TYPE.INFO,
            };
            toast(message, Object.assign({}, defaultOptions, options));
            break;
        case UIEventType.COPY_TO_CLIPBOARD:
            copyToClipboard(payload);
            return state;
        case UIEventType.SHOW_NOTIFICATION:
            Notifier.notify(payload);
            return state;
        case UIEventType.RUN_CHILD_PROCESS:
            const { script, params } = payload;
            ProcessManager.start(script, params);
            return state;
        case UIEventType.KILL_CHILD_PROCESS:
            const { pid } = payload;
            ProcessManager.kill(pid);
            return state;
        default:
            newState = state;
    }
    syncBackendAndChildProcessState(newState);
    return newState;
}

const updatePackageInfo = filePath => {
    const pathArr = filePath.split('/');
    const fileName = pathArr[pathArr.length - 1];
    const packageName = filePath.match(/packages\/(.*?)\/_/)[1];
    const namespace = filePath.match(/packages\/(.*?).yml/)[1] + '.yml';
    const packageInfo = {
        fileName,
        packageName,
        filePath,
        namespace,
    };
    return packageInfo;
};

export const AppAction = {
    loadNavsMenu: navs => {
        const action = {
            type: AppEventType.ON_LOAD_NAVS,
            payload: { navs },
        };
        Store.dispatch(action);
    },
    loadUISchemaPath: ymlPath => {
        const action = {
            type: AppEventType.ON_LOAD_UI,
            payload: { ymlPath },
        };
        Store.dispatch(action);
    },
    loadProcessesList: children => {
        const action = {
            type: AppEventType.ON_LOAD_PROCESSES_CHILD,
            payload: {
                children
            },
        };
        Store.dispatch(action);
    },
    updateUIState: payload => {
        const action = {
            type: UIEventType.UPDATE_UI_STATE,
            payload,
        };
        Store.dispatch(action);
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
        Store.dispatch(action);
    },
    closeModal: () => {
        const action = {
            type: UIEventType.CLOSE_MODAL,
            payload: null,
        };
        Store.dispatch(action);
    },
};
