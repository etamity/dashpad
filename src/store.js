import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './root-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
export const history = createBrowserHistory();

export const store = createStore(
    createRootReducer(history), // root reducer with router state
    composeWithDevTools(applyMiddleware(routerMiddleware(history)))
);
