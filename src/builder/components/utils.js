import _ from 'lodash';
import VM from 'libs/VM';
import Context from './context';
import { AppAction } from 'reducers/app';
import { FieldType, ContentType, UIEvent } from './Constants';
import { shell } from 'electron';
import { Store } from 'store';
import { ValueResolver } from './ValueResovler';
const specialCharacters = [
    '!',
    '#',
    '$',
    '%',
    '&',
    "'",
    '(',
    ')',
    '*',
    '+',
    ',',
    '-',
    '.',
    '/',
    ':',
    ';',
    '<',
    '=',
    '>',
    '?',
    '@',
    '[',
    '\\',
    ']',
    '^',
    '_',
    '`',
    '{',
    '|',
    '}',
    '~',
];

export const PropsFilter = (props, filters) => {
    const { obj } = props;
    return _.pickBy(obj, (val, key) => {
        return (
            !_.isObject(val) &&
            !isFirstLetterIsUpper(key) &&
            key.charAt(0) !== '_' &&
            filters.some(filter => key.indexOf(filter) > -1)
        );
    });
};

export const ParseKeyPathVars = (keyPath, obj) => {
    const vars = _.get(Store.getState().app.uiSchema, '$vars');
    return ValueResolver(
        obj,
        '\\${',
        '}',
        vars,
        keyPath,
        (keyNames, keyPath, parent) => {
            const propsNameArr = keyPath.split('.');
            const propName = propsNameArr[propsNameArr.length - 1];
            if (!parent.refs) {
                parent.refs = {};
            }
            if (!parent.refs[propName]) {
                parent.refs[propName] = keyNames[0];
            }
        },
        obj
    );
};

export const EventsHook = (props, events) => {
    const { type, obj } = props;
    return events.reduce((eventProps, next) => {
        const _type = type && type.toUpperCase();
        if (!eventProps[next]) {
            eventProps[next] = e => {
                if (next === UIEvent.ON_CHANGE) {
                    const { refs } = obj;
                    refs &&
                        Object.keys(refs).forEach(propKey => {
                            let value;
                            switch (_type) {
                                case FieldType.INPUT:
                                    value = e.target.value;
                                    break;
                                case ContentType.CODE:
                                    value = e;
                                    if (!obj.mode || obj.mode === 'json') {
                                        value = JSON.parse(e);
                                    }
                                    break;
                                default:
                            }
                            if (value) {
                                const keyPathFull = `$vars.${refs[propKey]}`;
                                AppAction.updateUIState({
                                    keyPath: keyPathFull,
                                    value,
                                });
                            }
                        });
                }
                if (
                    next === UIEvent.ON_CLICK &&
                    _.isPlainObject(obj) &&
                    (_type === ContentType.LINK || obj.link || obj.goto)
                ) {
                    const filePath = Store.getState().app.packageInfo.filePath;
                    const dir = filePath.substring(
                        0,
                        filePath.lastIndexOf('/') + 1
                    );
                    if (obj.link) {
                        const link =
                            obj.link.search('http') > -1
                                ? obj.link
                                : 'file://' + dir + obj.link;
                        shell.openExternal(link);
                    }
                    if (obj.goto) {
                        AppAction.loadUISchemaPath(dir + obj.goto);
                    }
                }
                try {
                    VM.run(obj[next], Context(props), e);
                } catch (err) {
                    console.error(err);
                }
            };
        }
        return eventProps;
    }, Object.create(null));
};

export const isFirstLetterIsUpper = str => {
    const f = str.charAt(0); // or str[0] if not supporting older browsers
    return f.toUpperCase() === f && !specialCharacters.includes(f);
};

export const getTypes = obj => {
    if (!obj) {
        return [];
    }
    return Object.keys(obj)
        .filter(name => isFirstLetterIsUpper(name) && _.isNaN(Number(name)))
        .map(name => ({
            type: name.split('_')[0],
            name,
        }));
};
