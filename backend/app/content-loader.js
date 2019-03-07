const ContentHelper = require('./helpers/content-helper');
const WebContent = require('./web-content');
const { AppEventType, ActionEventType } = require('./constants');
const FileManager = require('../libs/file-manager');
const path = require('path');
const reloadConfig = () => {
    const navs = ContentHelper.loadNavs();
    if (navs && navs.length > 0) {
        const action = {
            type: AppEventType.ON_LOAD_NAVS,
            payload: { navs }
        }
        WebContent.sendToUI(ActionEventType, action);
    }
}

const reloadUISchema = ymlPath => {
    const action = {
        type: AppEventType.ON_LOAD_UI,
        payload: { ymlPath }
    }
    WebContent.sendToUI(ActionEventType, action);
}


const loadScript = jsPath => FileManager.read(jsPath)

const loadJson = jsonPath => FileManager.loadJson(path.resolve(jsonPath))


module.exports = {
    reloadConfig,
    reloadUISchema,
    loadScript,
    loadJson
};
