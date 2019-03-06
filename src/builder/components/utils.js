import _ from 'lodash';
import { connect } from 'react-redux';
import Context from '../Context';
import { AppAction } from 'reducers/app';
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

export const PropsFilter = (props, filters) =>
    _.pickBy(
        props,
        (val, key) =>
            !_.isObject(val) && filters.some(filter => key.indexOf(filter) > -1)
    );

export const EventsHook = ({keyPath, obj}, events) =>
    events.reduce((eventProps, next) => {
        eventProps[next] = e => {
            if (next === 'onChange') {
                console.log('key', keyPath + '.value')
                AppAction.updateUIState({
                    keyPath: keyPath + '.value',
                    value: e.target.value,
                });
            }
            Context.vm.func(
                obj[next],
                {
                    obj,
                },
                [e]
            );
        };
        return eventProps;
    }, Object.create(null));

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
