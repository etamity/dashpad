import _ from 'lodash';
import { connect } from 'react-redux';

export default (view, _defaultFuncs, _defaultConnect) => {
    let defaultFuncs = _defaultFuncs;
    let defaultConnect = _defaultConnect;
    const DefaultView = view;
    const block = {
        connect: (...funcs) => {
            defaultConnect = connect(...funcs);
            return block;
        },
        compose: (...funcs) => {
            defaultFuncs = funcs;
            return block;
        },
        getComponent: () => {
            const allFuncs = []
                .concat(defaultFuncs)
                .concat([defaultConnect])
                .filter(fun => !!fun);
            const component = _.flowRight(allFuncs)(DefaultView);
            component.block = block;
            return component;
        },
        getView: () => DefaultView
    };
    return block;
};