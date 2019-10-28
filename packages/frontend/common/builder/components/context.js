import _ from 'lodash';
import { AppAction } from 'common/reducers/app';
import { Store } from 'common/store';
import { keyPathUtil } from 'common/libs/Utils';

export default props => {
    const state = Store.getState().app.uiSchema;
    const set = (key, value) => {
        const keyPath = keyPathUtil(props.keyPath).append(key).value;
        AppAction.updateUIState({
            keyPath: keyPath,
            value: value,
        });
    };
    const get = key => {
        return _.get(props.obj, key);
    };
    const getSibling = key => {
        const keyPath = keyPathUtil(props.keyPath)
            .sibling()
            .append(key).value;
        return _.get(state, keyPath);
    };
    const setSibling = (key, value) => {
        const keyPath = keyPathUtil(props.keyPath)
            .sibling()
            .append(key).value;
        AppAction.updateUIState({
            keyPath: keyPath,
            value: value,
        });
    };
    const getParent = key => {
        let parentKeyPath = keyPathUtil(props.keyPath).parent();
        const keyPath = key ? parentKeyPath.append(key) : parentKeyPath.value;
        return _.get(state, keyPath);
    };
    const setParent = (key, value) => {
        let keyPath = keyPathUtil(props.keyPath)
            .parent()
            .append(key).value;
        AppAction.updateUIState({
            keyPath: keyPath,
            value: value,
        });
    };

    return {
        props,
        set,
        get,
        getParent,
        setParent,
        getSibling,
        setSibling,
    };
};
