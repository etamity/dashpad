require("@babel/register")({});
require('util').inspect.defaultOptions.depth = null;
const { ProcessEventType } = require('./constants');
const DashpadApi = require('./context/dashpad_api');
const BackendStore = require('./store');
process.on('message', action => {
    if (!!action && (typeof action === 'object')) {
        const { type, payload } = action;

        switch (type) {
            case ProcessEventType.LOAD_MODULE_SCRIPT:
                let script = require(payload.filePath);
                const context = Object.assign({}, {
                    state: payload.state
                });
                global.Dashpad = new DashpadApi(context);
                //console.log('from laoder: ', this_context);
                typeof script === 'function' && script(payload.params);
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
