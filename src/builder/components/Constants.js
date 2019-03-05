import keyMirror from 'keymirror';

export const ContainerType = keyMirror({
    TABS: null,
    CARD: null,
    MODAL: null,
    FORM: null,
    NOTIFY: null,
    WIDGET: null,
    HEADER: null,
    BUTTONGROUP: null,
    ROW: null
});
export const ContentType = keyMirror({
    LIST: null,
    MARKDOWN: null,
    TEXT: null,
    LINK: null,
    PROGRESS: null,
    TABLE: null,
    HTML: null
});

export const FieldType = keyMirror({
    INPUT: null,
    BUTTON: null,
    RADIO: null,
    SELECT: null,
    CHECKBOX: null,
    SWITCH: null,
    FIELD: null
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
    WRAP: null
});