const ContentHelper = require('./helpers/content-helper');
const WebContent = require('./web-content');
const { AppEventType } = require('./constants');
const FileManager = require('../libs/file-manager');

const reloadConfig = () =>
    WebContent.sendToUI(AppEventType.ON_LOAD_NAVS, ContentHelper.loadNavs());

const reloadUISchema = ymlPath =>
    WebContent.sendToUI(AppEventType.ON_LOAD_UI, ymlPath);

const loadScript = jsPath => FileManager.read(jsPath)

module.exports = {
    reloadConfig,
    reloadUISchema,
    loadScript,
};
