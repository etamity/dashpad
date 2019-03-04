const { UIEventType } = require('./constants');
const Notifier = require('node-notifier');
const WebContent = require('./web-content');
module.exports = (action) => {
    switch (action.type) {
        case UIEventType.SHOW_NOTIFICATION:
        const {title, message, onClick} = action.payload;
        Notifier.notify(title, message, onClick);
        break;
        case UIEventType.SHOW_TOAST:
        WebContent.sendToUI(UIEventType.SHOW_TOAST, action.payload);
        break;
        case UIEventType.SHOW_MODAL:
        WebContent.sendToUI(UIEventType.SHOW_MODAL, action.payload);
        break;
        case UIEventType.UPDATE_UI_STATE:
        WebContent.sendToUI(UIEventType.UPDATE_UI_STATE, action.payload);
        break;
        default:
    }
}