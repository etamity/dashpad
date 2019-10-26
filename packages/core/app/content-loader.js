const ContentHelper = require('./helpers/content-helper');
const WebContent = require('./web-content');
const { AppEventType, ActionEventType } = require('./constants');

const reloadConfig = () => {
    const navs = ContentHelper.loadNavs();
    if (navs) {
        const action = {
            type: AppEventType.ON_LOAD_NAVS,
            payload: { navs },
        };
        WebContent.sendToUI(ActionEventType, action);
    }
};

const reloadUISchema = ymlPath => {
    const action = {
        type: AppEventType.ON_LOAD_UI,
        payload: { ymlPath },
    };
    WebContent.sendToUI(ActionEventType, action);
};

const reloadScript = jsPath => {
    const action = {
        type: AppEventType.ON_LOAD_SCRIPT,
        payload: { jsPath },
    };
    WebContent.sendToUI(ActionEventType, action);
};
module.exports = {
    reloadScript,
    reloadConfig,
    reloadUISchema
};
