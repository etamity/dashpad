import _ from 'lodash';
import { UIEvent } from './Constants';

export const VarsKeyStore = {};

export const KeyNameParser = (val, start, end) => {
    const reg = new RegExp(`(?<=${start})[\\s\\S]*?(?=${end})`, 'g');
    const keyNames = val.match(reg);
    return keyNames;
};

export const ValueResolver = (val, start, end, replaceVal, keyPath, key) => {
    let result = val;
    if (_.isPlainObject(val)) {
        return _.mapValues(val, (prop, key) => {
            return ValueResolver(
                prop,
                start,
                end,
                replaceVal,
                keyPath + '.' + key,
                key
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
                index
            )
        );
    } else if (_.isString(val)) {
        const isEvent = Object.values(UIEvent).includes(key);
        const keyNames = KeyNameParser(val, start, end);
        if (keyNames && !isEvent) {
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
            VarsKeyStore[keyPath] = keyNames;
            // eslint-disable-next-line no-new-wrappers
            // if (_.isObject(result)) {
            //     result._varsKey = keyNames;
            // } else if (_.isString(result)) {
            //     result = new String(result);
            //     result._varsKey = keyNames;
            // }
        }

        return result;
    }

    return val;
};
