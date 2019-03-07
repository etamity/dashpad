import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './root-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import VM from 'libs/VM';
import Native from 'libs/Native';
export const history = createBrowserHistory();

const { DashpadApi } = Native();

export const Store = createStore(
    createRootReducer(history), // root reducer with router state
    composeWithDevTools(applyMiddleware(routerMiddleware(history)))
);

const Dashpad = new DashpadApi({ isBrowser:true, dispatch: Store.dispatch, state: Store.getState()});

VM.addGlobal('Dashpad', Dashpad);
