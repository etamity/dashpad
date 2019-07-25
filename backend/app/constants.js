
const keyMirror = require('keymirror');

const AppEventType = keyMirror({
    ON_CONSOLE_LOG: null,
    ON_PROGRESS: null,
    ON_WINDOW_ACTIVE: null,
    ON_LOAD_NAVS: null,
    ON_LOAD_UI: null,
    ON_LOAD_SCRIPT: null,
    ON_LOAD_PROCESSES_CHILD: null,
    ON_BACKEND_ERROR: null,
    UPDATE_CURRENT_PACKAGE: null,
});

const ProcessEventType = keyMirror({
    LOAD_MODULE_SCRIPT: null,
    UPDATE_MODULE_STATE: null,
    ON_CHILD_PROCESS_ACTION: null
})

const UIEventType = keyMirror({
    UPDATE_UI_STATE: null,
    UPDATE_VARS_STATE: null,
    SHOW_NOTIFICATION: null,
    SHOW_TOAST: null,
    SHOW_MODAL: null,
    CLOSE_MODAL: null,
    COPY_TO_CLIPBOARD: null,
    RUN_CHILD_PROCESS: null,
    KILL_CHILD_PROCESS: null,
    PUSH_TO_KEYPATH_VARS: null,
    CLEAN_KEYPATH_VARS: null,
    UPDATE_UI_STATE_BY_VARS: null,
    CONSOLE_LOG: null
});

const ActionEventType = 'ActionEventType';

module.exports = {
    AppEventType,
    ProcessEventType,
    UIEventType,
    ActionEventType
}