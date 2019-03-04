import _ from 'lodash';
import { connect } from 'react-redux';

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
    _.pickBy(props, (val, key) => !_.isObject(val) && filters.includes(key));

export const isFirstLetterIsUpper = str => {
    const f = str.charAt(0); // or str[0] if not supporting older browsers
    return f.toUpperCase() === f;
};

export const getTypes = obj => {
    if (!obj) {
        return [];
    }
    return Object.keys(obj).filter(name => isFirstLetterIsUpper(name)).map( name => ({
        type: name.split('_')[0],
        name
    })) ;
};

