const { AppEventType, ActionEventType } = require('./constants');
const webContent = (global.mainWindow && global.mainWindow.webContents) || {
    send: function () {
        console.error('webContent.send() failed, mainWindow has not initialize yet!');
    }
};
const sendToUI = (event, params) => {
    webContent && webContent.send(event, params);
}

module.exports = {
    sendToUI,
    sendErrorToUI: (msg) => {
        const action = {
            type: AppEventType.ON_BACKEND_ERROR,
            payload: {
                msg
            }
        };
        sendToUI(ActionEventType, action);
    }
    
}
