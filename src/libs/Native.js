
import { Remote } from './Remote';
import { Store } from 'store';

const { ipcRenderer } = require('electron');
const { Constants, ContentLoader } = Remote();
const { ActionEventType } = Constants;

ContentLoader.reloadConfig();

ipcRenderer.removeAllListeners(ActionEventType)

ipcRenderer.on(ActionEventType, (e, action) => {
    Store.dispatch(action);
});

export default Remote;
