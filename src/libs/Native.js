import { AppAction } from 'reducers/app';
import { toast } from 'react-toastify';

const { remote } = require('electron');
const Remote = () => remote.require('../backend/app/index');
const { ipcRenderer } = require('electron');
const { Constants, ContentLoader } = Remote();
const { AppEventType, UIEventType } = Constants;

ContentLoader.reloadConfig();

ipcRenderer.removeAllListeners(AppEventType.ON_LOAD_NAVS)
ipcRenderer.removeAllListeners(AppEventType.ON_LOAD_UI)
ipcRenderer.removeAllListeners(AppEventType.ON_LOAD_PROCESSES_CHILD)
ipcRenderer.removeAllListeners(AppEventType.ON_BACKEND_ERROR)

ipcRenderer.removeAllListeners(UIEventType.SHOW_MODAL)
ipcRenderer.removeAllListeners(UIEventType.SHOW_TOAST)
ipcRenderer.removeAllListeners(UIEventType.UPDATE_UI_STATE)

ipcRenderer.on(AppEventType.ON_LOAD_NAVS, (e, navs) => {
    AppAction.loadNavsMenu(navs);
});

ipcRenderer.on(AppEventType.ON_LOAD_UI, (e, ymlPath) => {
    AppAction.loadUISchemaPath(ymlPath);
});

ipcRenderer.on(AppEventType.ON_LOAD_PROCESSES_CHILD, (e, processes) => {
    AppAction.loadProcessesList(processes);
});

ipcRenderer.on(AppEventType.ON_BACKEND_ERROR, (e, msg) => {
    const errMsg = `Error: Schema failed to parse !\n ${msg}`;
    console.error(errMsg);
    toast.error(errMsg, {
        position: toast.POSITION.TOP_RIGHT,
    });
});
ipcRenderer.on(UIEventType.SHOW_MODAL, (e, params) => {
    AppAction.showModal(params);
});

ipcRenderer.on(UIEventType.SHOW_TOAST, (e, { message, options }) => {
    const defaultOptions = {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.INFO,
    };
    toast(message, Object.assign({}, defaultOptions, options));
});
ipcRenderer.on(UIEventType.UPDATE_UI_STATE, (e, payload) => {
    AppAction.updateUIState(payload);
});

export default Remote;
