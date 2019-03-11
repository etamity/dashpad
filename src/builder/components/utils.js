import _ from 'lodash';
import { connect } from 'react-redux';
import VM from 'libs/VM';
import KeyPathManager from 'libs/KeyPathManager';
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
export const dynamicMapRedux = (props, component) => {
    const propsKey = Object.keys[props];
    const mapStateToProps = state => {
        return {
            ...propsKey,
        };
    };
    return connect(mapStateToProps)(component);
};

export const PropsFilter = (props, filters) => {
    const { obj } = props;
    return _.pickBy(obj, (val, key) => {
        return (
            !_.isObject(val) && filters.some(filter => key.indexOf(filter) > -1)
        );
    });
};

export const ParseKeyPathVars = (keyPath, name, obj) => {
    _.forEach(obj, (val, key) => {
        if (val && _.isString(val) && val.indexOf('${') > -1) {
            const keyName = val.slice(val.indexOf('${') + 2, val.indexOf('}'));
            const defualtVal = _.get(Store.getState().app.uiSchema, `$vars.${keyName}`);
            if (!obj.refs) {
                obj.refs = {};
            }
            obj.refs[key] = keyName;
            obj[key] = defualtVal;
            KeyPathManager.push(keyName, `${keyPath}.${name}.${key}`);
        }
    });
};

export const EventsHook = (props, events) => {
    const { name, keyPath, type, obj } = props;
    return events.reduce((eventProps, next) => {
        eventProps[next] = e => {
            if (next === 'onChange' && type === FieldType.INPUT) {
                const keyPathFull = (keyPath + '.value').substring(1);
                const keyRefs = (keyPath + '.refs.value').substring(1);
                const keyPathRefs =  _.get(Store.getState().app.uiSchema, keyRefs);
  
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
            if (next === 'onClick' && type === ContentType.LINK) {
                obj.link && shell.openExternal(obj.link);
            }
            VM.func(
                obj[next],
                {
                    props: Object.create({
                        obj,
                        type,
                        keyPath,
                        name,
                    }),
                },
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
