import { Remote } from 'common/libs/Remote';
import VM from 'common/libs/VM';
import ConfigureStore from 'common/libs/ConfigureStore';
import { ipcRenderer } from 'electron';
import initState from 'initState';
import reducers from 'common/reducers';

const { Constants, ContentLoader, DashpadApi } = Remote();

export const Store = ConfigureStore(reducers, { app: initState });

export const Dashpad = new DashpadApi({
    isBrowser: true,
    dispatch: Store.dispatch,
    state: Store.getState(),
});

VM.addGlobal('Dashpad', Dashpad);

const { ActionEventType } = Constants;

ContentLoader.reloadConfig();

ipcRenderer.removeAllListeners(ActionEventType);

ipcRenderer.on(ActionEventType, (e, action) => {
    Store.dispatch(action);
});
