import _ from 'lodash';
import { AppAction } from 'common/reducers/app';
import { Store } from 'common/store';
import { keyPathUtil } from 'common/libs/Utils';
import VM from 'common/libs/VM';

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
        const ref = VM.getRef(key);
        const newProps = _.get(props.obj, key);;
        return {...newProps, [key]: ref};
    };
    const getSibling = key => {
        const keyPath = keyPathUtil(props.keyPath)
            .sibling()
            .append(key).value;
        const ref = VM.getRef(keyPath);
        const newProps = _.get(state, keyPath);
        return { ...newProps, [key]: ref };
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
        const keyPath = key
            ? parentKeyPath.append(key).value
            : parentKeyPath.value;
        const ref = VM.getRef(keyPath);
        const newProps = _.get(state, keyPath);
        return { ...newProps, [key]: ref };
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
