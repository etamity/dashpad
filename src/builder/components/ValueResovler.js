const _ = require('lodash');

export const ValueResolver = (
    val,
    start,
    end,
    replaceVal,
    keyPath,
    callback
) => {
    if (_.isPlainObject(val)) {
        
        return _.mapValues(val, (prop, key) =>
            ValueResolver(
                prop,
                start,
                end,
                replaceVal,
                keyPath + '.' + key,
                callback
            )
        );
    }
    if (_.isArray(val)) {
        return val.map((prop, index) =>
            ValueResolver(
                prop,
                start,
                end,
                replaceVal,
                keyPath + '.' + index,
                callback
            )
        );
    }
    let result = val;
    if (_.isString(val)) {
        const reg = new RegExp(`(?<=${start})[\\s\\S]*?(?=${end})`, 'g');
        const keyNames = val.match(reg);

        if (keyNames) {
            if (keyNames.length === 1) {
                result = _.get(replaceVal, keyNames[0]);
            } else {
                result = keyNames.reduce((root, next) => {
                    let convertVal = _.get(replaceVal, next);
                    if (_.isObject(convertVal)) {
                        convertVal = JSON.stringify(convertVal);
                    }
                    return root.replace(start + next + end, convertVal);
                }, val);
            }

            callback && callback(val, keyNames, keyPath, result );
        }
    }
    return result;
};
