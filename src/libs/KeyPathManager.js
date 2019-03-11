import immutable from 'object-path-immutable';
import _ from 'lodash';

let state = {}

export default {
    push: (keyName, keyPath) => {
         state =  immutable(state).push(keyName, keyPath).value();
    },
    get: (keyName) => {
        return state[keyName];
    },
    set: (keyName, value) => {
        state = immutable(state).set(keyName, value).value();
    },
    value: () => state,
    clear: () => {
        state = {};
    }
}