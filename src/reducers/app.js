import { RouteBuilder, NavBuilder } from 'libs/NavsBuilder.js';
import immutable from 'object-path-immutable';
import * as Plugins from 'plugins';
import Native from 'libs/Native';
import { Store } from 'App';
import _ from 'lodash';
const { Constants, BackendStore, ProcessManager } = Native();
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
        ...current(),
        packageInfo: null,
    },
    uischema: null,
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

export default function update(state = initState, action) {
    let newState = state;
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            const { hash } = action.payload.location;
            newState = immutable(state)
                .merge('current', current(hash))
                .value();
            break;
        case AppEventType.ON_LOAD_NAVS:
            newState = immutable(state)
                .set(
                    'config.SideMenus.items',
                    config.SideMenus.items.concat(action.payload)
                )
                .value();
            break;
        case AppEventType.ON_LOAD_UI:
            newState = immutable(state)
                .set('uischema', action.payload)
                .value();
            break;
        case UIEventType.UPDATE_UI_STATE:

            if (_.isArray(action.payload)) {
                const stateArr = action.payload;
    
                newState = stateArr.reduce((root, next) => {
                    const { keyPath, value } = next;
                    return updateUIState(keyPath, value, root);
                }, state);
            } else {
                const { keyPath, value } = action.payload;
     
                newState = updateUIState(keyPath, value, state);
            }

            break;
        case AppEventType.UPDATE_CURRENT_PACKAGE:
            newState = immutable(state)
                .set('packageInfo', action.payload)
                .value();
            break;
        case AppEventType.ON_LOAD_PROCESSES_CHILD:
            newState = immutable(state)
                .set('processes', action.payload)
                .value();
            break;
        case UIEventType.ON_CHANGE_TAB:
            newState = immutable(state)
                .set('uischema.__activeTab', action.payload)
                .value();
            break;
        case UIEventType.SHOW_MODAL:
            newState = immutable(state)
                .push('modal', action.payload)
                .value();
            break;
        case UIEventType.CLOSE_MODAL:
            const modal = state.modal;
            newState = immutable(state)
                .del(`modal.${modal.length - 1}`)
                .value();
            break;
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
        namespace
    };
    const action = {
        type: AppEventType.UPDATE_CURRENT_PACKAGE,
        payload: packageInfo,
    };

    Store.dispatch(action);
};

export const AppAction = {
    loadNavsMenu: navs => {
        const action = {
            type: AppEventType.ON_LOAD_NAVS,
            payload: navs,
        };
        Store.dispatch(action);
    },
    loadUISchema: uischema => {
        const action = {
            type: AppEventType.ON_LOAD_UI,
            payload: uischema,
        };
        Store.dispatch(action);
    },
    loadUISchemaPath: uiFilePath => {
        const { ContentHelper } = Native();

        const uischema = ContentHelper.loadJson(uiFilePath);
        const action = {
            type: AppEventType.ON_LOAD_UI,
            payload: uischema,
        };
        updatePackageInfo(uiFilePath);
        Store.dispatch(action);
    },
    loadProcessesList: children => {
        const action = {
            type: AppEventType.ON_LOAD_PROCESSES_CHILD,
            payload: children,
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
    onChangeTab: index => {
        const action = {
            type: UIEventType.ON_CHANGE_TAB,
            payload: index,
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
