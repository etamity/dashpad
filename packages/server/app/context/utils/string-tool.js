module.exports = {
    replace: (source, start, end, val) => {
        const reg = new RegExp(`(?<=${start})[\\s\\S]*?(?=${end})`, 'g');
        return source.replace(reg, val);
    },
    inject: function (val, map) {
        let keys = Object.keys(map);

        keys.map((v) => {
            let newV = map[v],
                reg = new RegExp('\\$\{' + v + '\}', 'g');

            val = val.replace(reg, newV);
        });

        return val;
    },
    get: (source, start, end) => {
        const reg = new RegExp(`(?<=${start})[\\s\\S]*?(?=${end})`, 'g');
        const regArr = source.match(reg);
        return (regArr && regArr.length > 0 && regArr[0]) || '';
    }
}