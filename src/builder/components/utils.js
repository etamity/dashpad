import _ from 'lodash';
import { connect } from 'react-redux';
import Context from '../Context';
import { AppAction } from 'reducers/app';
import { FieldType } from './Constants';
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

export const EventsHook = (props, events) => {
    const {keyPath, type, obj} = props;
    return events.reduce((eventProps, next) => {
        eventProps[next] = e => {
            if (next === 'onChange' && type === FieldType.INPUT) {
                AppAction.updateUIState({
                    keyPath: keyPath + '.value',
                    value: e.target.value,
                });
            }
            Context.vm.func(
                obj[next],
                {
                    props,
                },
                [e]
            );
        };
        return eventProps;
    }, Object.create(null));
}
    

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
