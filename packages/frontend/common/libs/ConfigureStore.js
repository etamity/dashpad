import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';

import CombineReducers, { history } from './CombineReducers';

const createCombinedStore = (reducers, initState) => {
    const middlewares = [thunkMiddleware, routerMiddleware(history)];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    const store = createStore(
        CombineReducers(reducers, initState),
        composedEnhancers
    );
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(CombineReducers(store.injectedReducers));
        });
    }
    store.initState = initState;
    return store;
};

export default createCombinedStore;