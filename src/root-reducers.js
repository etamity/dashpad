import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import reducers from './reducers';
export default history =>
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    });
