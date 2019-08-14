import { Remote } from 'common/libs/Remote';
import VM from 'common/libs/VM';
import ConfigureStore from 'common/libs/ConfigureStore';
import { ipcRenderer } from 'electron';
import initState from 'initState';
import reducers from 'common/reducers';
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

window.Dashpad = Dashpad;
VM.addGlobal('Dashpad', Dashpad);
