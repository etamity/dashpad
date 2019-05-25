require('util').inspect.defaultOptions.depth = null;
const { ProcessEventType } = require('./constants');
const DashpadApi = require('./context/dashpad_api');
const BackendStore = require('./store');
const module_path = process.argv.slice(2)[0];
console.log('module_path', module_path);
const script = require(module_path);

process.on('message', action => {
    if (!!action && (typeof action === 'object')) {
        const { type, payload } = action;

        switch (type) {
            case ProcessEventType.LOAD_MODULE_SCRIPT:
                const context = Object.assign({}, {
                    state: payload.state
                });
                global.Dashpad = new DashpadApi(context);
                typeof script === 'function' && script(payload.params);
                typeof script.default === 'function' && script.default(payload.params);
                break;

            case ProcessEventType.UPDATE_MODULE_STATE:
                BackendStore.set('app', payload);
                break;
            default:
        }
    } else {
        console.error(action);
    }
});
