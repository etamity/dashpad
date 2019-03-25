import _ from 'lodash';
import { AppAction } from 'reducers/app';
import { Store } from 'store';

export default (props) => {
    const state = Store.getState().app.uiSchema;
    const set = (key, value) => {
        const keyPath = `${props.keyPath}.${key}`;
        AppAction.updateUIState({
            keyPath: keyPath,
            value: value,
        });
    }
    const get = (key) => {
        return props.obj[key];
    }
    const getSibling = (key) => {
        const silbingKeyPath = props.keyPath.substring(0, props.keyPath.lastIndexOf('.'));
        const keyPath = `${silbingKeyPath}.${key}`;
        return _.get(state, keyPath);
    }
    const setSibling = (key, value) => {
        const silbingKeyPath = props.keyPath.substring(0, props.keyPath.lastIndexOf('.'));
        const keyPath = `${silbingKeyPath}.${key}`;
        AppAction.updateUIState({
            keyPath: keyPath,
            value: value,
        });
    }
    return {
        props,
        set,
        get,
        getSibling,
        setSibling
    }
}