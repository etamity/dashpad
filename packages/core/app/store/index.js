const immutable = require('object-path-immutable');
const _ = require('lodash');

let state = {
    app: {},
};
module.exports = {
    init: _state => {
        state = _state;
        return state;
    },
    set: (keyPath, value) => {
        state = immutable(state)
            .set(keyPath, value)
            .value();
        return state;
    },
    get: keyPath => {
        return keyPath ? _.get(state, keyPath) : state;
    },
    delete: keyPath => {
        state = immutable.del(state, keyPath);
        return state;
    },
    push: (keyPath, value) => {
        state = immutable.push(state, keyPath, value);
        return state;
    },
};
