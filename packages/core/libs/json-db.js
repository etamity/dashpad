const fm = require('../libs/file-manager');
const lodashId = require('lodash-id');
const JsonModel = require('./json-model')
const config = require('@dashpad/config').value();

class JsonDb {
    constructor(name) {
        this.filename = name;
        this.db = fm.loadJsonDb([config.getPaths().workspace, `${name}.json`].join('/'));
        this.db._.mixin(lodashId);
        this.collections = [];
    }
    add(name, defaultValue) {
        const defaultModel = {};
        defaultModel[name] = defaultValue;
        const model = this.db.defaults(defaultModel).get(name);
        const jsonModel = new JsonModel(name, model);
        this.collections[name] = jsonModel;
        return jsonModel;
    }
    remove(name) {
        this.collections[name].remove().write();
        delete this.collections[name];
    }
    get(name) {
        return this.collections[name];
    }
}
module.exports = JsonDb;