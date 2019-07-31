import { Remote } from 'libs/Remote';
import VM from 'libs/VM';
import ConfigureStore from 'libs/ConfigureStore';
import { ipcRenderer } from 'electron';
import initState from 'initState';
import reducers from 'reducers';
const { Constants, ContentLoader, DashpadApi } = Remote();

const { ActionEventType } = Constants;

export const Store = ConfigureStore(reducers, { app: initState });

ContentLoader.reloadConfig();

ipcRenderer.removeAllListeners(ActionEventType);

ipcRenderer.on(ActionEventType, (e, action) => {
    Store.dispatch(action);
});

export const Dashpad = new DashpadApi({
    isBrowser: true,
    dispatch: Store.dispatch,
    state: Store.getState(),
});

VM.addGlobal('Dashpad', Dashpad);
