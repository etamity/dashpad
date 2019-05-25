require('util').inspect.defaultOptions.depth = null;
const _ = require('lodash');

const $vars = {
    somevar: 'test',
    something: 'new',
    someObj: {
        obj1: 'hahaha',
        num: 1,
        boolean: false,
        array: [
            1,
            'asd',
            true,
            {
                test: 'test',
            },
        ],
    },
};

const resovleObj = {
    string: 'this is ${something} value resolve ${someObj}',
    array: [
        'this is ${something} value resolve ${someObj}',
        '${someObj}',
        '${someObj.num}',
        '${someObj.array}',
    ],
    obj: '${someObj}',
    bool: '${someObj.boolean}',
    num: '${someObj.num}',
    objdeep: {
        another: {
            obj: '${someObj}',
            bool: '${someObj.boolean}',
            num: '${someObj.num}',
        },
    },
};

const ValueResolver = (source, start, end, replaceVal, keyPath, callback) => {
    if (_.isPlainObject(source)) {
        return _.mapValues(source, (prop, key) =>
            ValueResolver(prop, start, end, replaceVal, keyPath + '.' + key, callback)
        );
    }
    if (_.isArray(source)) {
        return source.map((prop, index) =>
            ValueResolver(prop, start, end, replaceVal, keyPath + '.' + index, callback)
        );
    }
    const reg = new RegExp(`(?<=${start})[\\s\\S]*?(?=${end})`, 'g');
    const regArr = source.match(reg);
    let result;
    if (regArr.length === 1) {
        result = _.get(replaceVal, regArr[0]);
    } else {
        result = regArr.reduce((root, next) => {
            let convertVal = _.get(replaceVal, next);
            if (_.isObject(convertVal)) {
                convertVal = JSON.stringify(convertVal);
            }
            return root.replace('${' + next + '}', convertVal);
        }, source);
    }
    //console.log(keyPath);
    callback && callback(source, result, replaceVal, keyPath);
    return result;
};
// console.log(resovleObj);
// console.log('===========================');
ValueResolver(
    resovleObj,
    '\\${',
    '}',
    $vars,
    'root',
    (source, result, replaceVal, keyPath) => {
        console.log(keyPath, result);
    }
);
