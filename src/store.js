import Native from 'libs/Native';
import { Remote } from 'libs/Remote';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './root-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import VM from 'libs/VM';
import { ipcRenderer } from 'electron';

const { Constants } = Remote();

const { ActionEventType } = Constants;

export const history = createBrowserHistory();

const { DashpadApi } = Native();

export const Store = createStore(
    createRootReducer(history), // root reducer with router state
    composeWithDevTools(applyMiddleware(routerMiddleware(history)))
);

ipcRenderer.removeAllListeners(ActionEventType)

ipcRenderer.on(ActionEventType, (e, action) => {
    Store.dispatch(action);
});

export const Dashpad = new DashpadApi({ isBrowser:true, dispatch: Store.dispatch, state: Store.getState()});

VM.addGlobal('Dashpad', Dashpad);
