import _ from 'lodash';
import VM from 'libs/VM';
import KeyPathManager from 'libs/KeyPathManager';
import Context from './context';
import { AppAction } from 'reducers/app';
import { FieldType, ContentType } from './Constants';
import { shell } from 'electron';
import { Store } from 'store';

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
            !_.isObject(val) && filters.some(filter => key.indexOf(filter) > -1)
        );
    });
};

const getVarsValue = val => {
    const keyName = val.slice(val.indexOf('${') + 2, val.indexOf('}'));
    const isExist = KeyPathManager.isExist(keyName);
    return isExist
        ? _.get(Store.getState().app.uiSchema, `$vars.${keyName}`)
        : val;
};

const addVarsToKeyPathManager = (val, key, keyPath, name, obj) => {
    if (_.isString(val) && val.indexOf('${') > -1) {
        const keyName = val.slice(val.indexOf('${') + 2, val.indexOf('}'));
        const defualtVal = getVarsValue(val);
        if (!obj.refs) {
            obj.refs = {};
        }
        obj.refs[key] = keyName;
        obj[key] = defualtVal;
        KeyPathManager.push(keyName, `${keyPath}.${name}.${key}`);
    } else if (_.isArray(val)) {
        const items = val.map((iValue, index) => {
            if (!!key && _.isString(iValue) && iValue.indexOf('${') > -1) {
                const keyName = iValue.slice(
                    iValue.indexOf('${') + 2,
                    iValue.indexOf('}')
                );
                if (!obj.refs) {
                    obj.refs = {};
                }
                obj.refs[`${key}.${index}`] = keyName;
                KeyPathManager.push(
                    keyName,
                    `${keyPath}.${name}.${key}.${index}`
                );
                const defaultVal = getVarsValue(iValue);
                return defaultVal;
            }
            return iValue;
        });
        obj[key] = items;
    }
};

export const ParseKeyPathVars = (keyPath, name, obj) => {
    _.forEach(obj, (val, key) => {
        if (!!val && !_.isEmpty(val)) {
            addVarsToKeyPathManager(val, key, keyPath, name, obj);
        }
    });
};

export const EventsHook = (props, events) => {
    const { name, keyPath, type, obj } = props;
    return events.reduce((eventProps, next) => {
        const _type = type && type.toUpperCase();
        eventProps[next] = e => {
            if (next === 'onChange' && _type === FieldType.INPUT) {
                const keyPathFull = keyPath + '.value';
                const keyRefs = keyPath + '.refs.value';
                const keyPathRefs = _.get(
                    Store.getState().app.uiSchema,
                    keyRefs
                );

                if (keyPathRefs) {
                    AppAction.updateUIState({
                        keyPath: `$vars.${keyPathRefs}`,
                        value: e.target.value,
                    });
                }
                AppAction.updateUIState({
                    keyPath: keyPathFull,
                    value: e.target.value,
                });
            }
            if (next === 'onClick' && _type === ContentType.LINK) {
                obj.link && shell.openExternal(obj.link);
            }
            VM.run(
                obj[next],
                Context(props),
                e
            );
        };
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
        .filter(name => isFirstLetterIsUpper(name))
        .map(name => ({
            type: name.split('_')[0],
            name,
        }));
};
