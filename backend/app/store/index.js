const immutable = require('object-path-immutable');
let state = {
    app: {},
};

module.exports = {
    get: () => {
        return state;
    },
    set: (keyPath, value) => {
        state = immutable(state)
            .set(keyPath, value)
            .value();
        return state;
    },
};
