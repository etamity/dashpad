import immutable from 'object-path-immutable';
import _ from 'lodash';

let state = {}

export default {
    push: (keyName, keyPath) => {
         state =  immutable(state).push(keyName, keyPath).value();
    },
    get: (keyName) => {
        return  _.get(state, keyName);
    },
    value: () => state,
    clear: () => {
        state = {};
    }
}