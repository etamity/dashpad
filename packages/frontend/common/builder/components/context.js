import _ from 'lodash';
import { AppAction } from 'common/reducers/app';
import { Store } from 'common/store';
import { keyPathUtil } from 'common/libs/Utils';
import VM from 'common/libs/VM';

export default props => {
    const state = Store.getState();
    const target = basePath => ({
        value: () => {
            const { packageInfo } = state.app;
            const { namespace } = packageInfo || {};
            const uiSchema = namespace && state.app.uiSchema[namespace] || {}
            return _.get(uiSchema, basePath)
        },
        ref: () => VM.getRef(basePath),
        sibling: key => {
            const keyPath = keyPathUtil(basePath)
                .sibling()
                .append(key).value;
            return target(keyPath);
        },
        parent: key => {
            let parentKeyPath = keyPathUtil(basePath).parent();
            const keyPath = key
                ? parentKeyPath.append(key).value
                : parentKeyPath.value;
            return target(keyPath);
        },
        set: value => {
            AppAction.updateUIState({
                keyPath: basePath,
                value: value,
            });
            return target(basePath);
        },
        get: key => {
            const keyPath = keyPathUtil(basePath).append(key).value;
            return target(keyPath);
        },
    });

    return {
        ...target(props.keyPath),
        props,
    };
};
