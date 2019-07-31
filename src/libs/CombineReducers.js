import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

export const history = createBrowserHistory();

const wrapReducers = (reducers, initialState) => {
    const newReducers = {};

    Object.keys(reducers)
        .filter(key => typeof reducers[key] === 'function')
        .forEach(key => {
            const fn = reducers[key];
            var defaultState = initialState[key]
            newReducers[key] = (state = defaultState, action) => fn(state, action);
        });
    Object.keys(initialState).forEach(key => {
        if (newReducers[key] == null) {
            throw new Error(
                'Unnecessary key in initial state. key: "' + key + '".'
            );
        }
    });

    return combineReducers({
        router: connectRouter(history),
        ...newReducers
    });
};

export default wrapReducers;
