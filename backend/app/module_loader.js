require('util').inspect.defaultOptions.depth = null;
const { ProcessEventType } = require('./constants');
const context = require('./context/dashpad');
process.on('message', action => {
    if (!!action) {
        const { type, payload } = action;

        switch (type) {
            case ProcessEventType.LOAD_MODULE_SCRIPT:
                let script = require(payload.filePath);
                global.Dashpad = context(payload.context);
                //console.log('from laoder: ', this_context);
                typeof script === 'function' && script(payload.params);
                break;

            case ProcessEventType.UPDATE_MODULE_STATE:
                global.Dashpad._replaceState(payload);
                break;
            default:
        }
    }
});
