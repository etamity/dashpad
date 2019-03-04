
const keyMirror = require('keymirror');

const AppEventType = keyMirror({
    ON_CONSOLE_LOG: null,
    ON_PROGRESS: null,
    ON_WINDOW_ACTIVE: null,
    ON_LOAD_NAVS: null,
    ON_LOAD_UI: null,
    ON_LOAD_PROCESSES_CHILD: null,
    ON_BACKEND_ERROR: null,
    UPDATE_CURRENT_PACKAGE: null,
});

const ProcessEventType = keyMirror({
    LOAD_MODULE_SCRIPT: null,
    UPDATE_MODULE_STATE: null
})

const UIEventType = keyMirror({
    UPDATE_UI_STATE: null,
    SHOW_NOTIFICATION: null,
    SHOW_TOAST: null,
    SHOW_MODAL: null,
    CLOSE_MODAL: null,
});


module.exports = {
    AppEventType,
    ProcessEventType,
    UIEventType
}