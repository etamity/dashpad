import _ from 'lodash';
import VM from 'common/libs/VM';
import Context from './context';
import { AppAction } from 'common/reducers/app';
import { SchemaKeys } from 'common/reducers/Constants';
import { ContentType, UIEvent } from './Constants';
import { shell } from 'electron';
import { Store } from 'common/store';
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
    const { obj, ref } = props;
    const filteredProps = _.pickBy(obj, (val, key) => {
        return (
            !_.isObject(val) &&
            !isFirstLetterIsUpper(key) &&
            key.charAt(0) !== '_' &&
            filters.some(filter => key.indexOf(filter) > -1)
        );
    });
    return {
        ...filteredProps,
        ref
    }
};

export const ParseKeyPathVars = (keyPath, obj) => {
    const state = Store.getState().app;
    const { packageInfo } = state;
    const { namespace } = packageInfo;
    const pluginPath = `${SchemaKeys.UISCHEMA}.${namespace}.${SchemaKeys.VARS}`;
    const vars = _.get(state, pluginPath);
    const start = '\\${';
    const end = '}';
    return ValueResolver(obj, start, end, vars, keyPath);
};

export const EventsHook = (props, events) => {
    const { type, obj } = props;
    return events.reduce((eventProps, next) => {
        const _type = type && type.toUpperCase();
        eventProps[next] = e => {
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
                    if (shell) {
                        shell.openExternal(link);
                    }
                }
                if (obj.goto) {
                    AppAction.loadUISchemaPath(dir + obj.goto);
                }
            }
            try {
                VM.runEvent(obj[next], Context(props), e);
            } catch (err) {
                console.error(err);
            }
        };
        return eventProps;
    }, Object.create(null));
};

export const isFirstLetterIsUpper = str => {
    const f = str.charAt(0); // or str[0] if not supporting older browsers
    return f.toUpperCase() === f && !specialCharacters.includes(f);
};

export const getTypes = obj => {
    if (_.isString(obj) || !obj) {
        return [];
    }
    return Object.keys(obj)
        .filter(name => isFirstLetterIsUpper(name) && _.isNaN(Number(name)))
        .map(name => ({
            type: name.split('_')[0],
            name,
        }));
};
