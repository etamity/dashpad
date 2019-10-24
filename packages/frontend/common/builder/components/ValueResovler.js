import _ from 'lodash';
import { UIEvent } from './Constants';

export const KeyNameParser = (val, start, end, keyPath) => {
    const propsNameArr = keyPath.split('.');
    const propName = propsNameArr[propsNameArr.length - 1];
    const reg = new RegExp(`(?<=${start})[\\s\\S]*?(?=${end})`, 'g');
    const keyNames = val.match(reg);
    return { keyNames, propName };
};
export const ValueResolver = (val, start, end, replaceVal, keyPath, parent) => {
    let result = val;
    if (_.isPlainObject(val)) {
        return _.mapValues(val, (prop, key) => {
            return (
                (Object.values(UIEvent).includes(key) && prop) ||
                ValueResolver(
                    prop,
                    start,
                    end,
                    replaceVal,
                    keyPath + '.' + key,
                    val
                )
            );
        });
    } else if (_.isArray(val)) {
        return val.map((prop, index) =>
            ValueResolver(
                prop,
                start,
                end,
                replaceVal,
                keyPath + '.' + index,
                parent
            )
        );
    } else if (_.isString(val)) {
        const { keyNames, propName } = KeyNameParser(val, start, end, keyPath);
        if (keyNames) {
            if (keyNames.length === 1) {
                result = _.get(replaceVal, keyNames[0]);
            } else {
                result = keyNames.reduce((root, next) => {
                    let convertVal = _.get(replaceVal, next);
                    if (_.isObject(convertVal)) {
                        convertVal = JSON.stringify(convertVal);
                    }
                    const replaceReg = new RegExp(`${start}${next}${end}`, 'g');
                    return root.replace(replaceReg, convertVal);
                }, val);
            }
            parent.refs = { ...parent.refs, [propName]: keyNames };
            // console.log(parent.refs );
        }
        return result;
    }
    return val;
};
