import keyMirror from 'keymirror';

export const ContainerType = keyMirror({
    CONTAINER: null,
    TABS: null,
    TAB: null,
    CARD: null,
    FORM: null,
    HEADER: null,
    FOOTER: null,
    BUTTONGROUP: null,
    ROW: null,
    COLLAPSE: null,
    SLOT: null,
    ALERT: null,
    WEBVIEW: null
});

export const ContentType = keyMirror({
    BADGE: null,
    LIST: null,
    LISTITEM: null,
    MARKDOWN: null,
    JSONSCHEMA: null,
    CODE: null,
    TEXT: null,
    LINK: null,
    PROGRESS: null,
    TABLE: null,
    HTML: null,
});

export const FieldType = keyMirror({
    INPUT: null,
    BUTTON: null,
    RADIO: null,
    SELECT: null,
    CHECKBOX: null,
    SWITCH: null,
    FIELD: null,
});

export const InputType = keyMirror({
    TEXT: null,
    NUMBER: null,
    PASSWORD: null,
    EMAIL: null,
    DATE: null,
    DATETIME: null,
    TIME: null,
    FILE: null,
    TEXTAREA: null,
});

export const InputAddonType = keyMirror({
    TEXT: null,
    BUTTON: null,
});

export const ButtonGroupType = keyMirror({
    GROUP: null,
    TOOLBAR: null,
    DROPDOWN: null,
    WRAP: null,
});

export const UIEvent = {
    ON_CLICK: 'onClick',
    ON_CHANGE: 'onChange',
    ON_MOUNT: 'onMount',
    ON_UMOUNT: 'onUnMount',

    ON_SUBMIT: 'onSubmit',
    ON_ERROR: 'onError',

    ON_LOAD: 'onLoad',
    ON_BEFORE_LOAD: 'onBeforeLoad',
    ON_COPY: 'onCopy',
    ON_PASTE: 'onPaste',
    ON_SELECTION_CHANGE: 'onSelectionChange',
    ON_CURSOR_CHANGE: 'onCursorChange',
    ON_FOCUS: 'onFocus',
    ON_BLUR: 'onBlur',
    ON_INPUT: 'onInput',
    ON_SCROLL: 'onScroll',

    ON_ENTERING: 'onEntering',
    ON_ENTERED: 'onEntered',
    ON_EXITING: 'onExiting',
    ON_EXITED: 'onExited',
};

export const isInputType = type =>
    !!(type && Object.keys(InputType).includes(type.toUpperCase()));
