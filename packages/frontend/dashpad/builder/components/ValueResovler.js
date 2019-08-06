import _ from 'lodash';
import { UIEvent } from './Constants';
export const ValueResolver = (
    val,
    start,
    end,
    replaceVal,
    keyPath,
    callback,
    parent
) => {
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
                    callback,
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
                callback,
                val
            )
        );
    }

    if (_.isString(val)) {
        const reg = new RegExp(`(?<=${start})[\\s\\S]*?(?=${end})`, 'g');
        const keyNames = val.match(reg);
        if (keyNames) {
            if (keyNames.length === 1) {
                result = _.get(replaceVal, keyNames[0]);
                callback && callback(keyNames, keyPath, parent);
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
        }
    }
    return result;
};
