const shortid = require('shortid')
class JsonModel {
    constructor(name, model) {
        this.name = name;
        this.model = model;
    }
    add(data) {
        const entry = Object.assign({}, data, { id: shortid.generate()});
        if (this.model.isArray()) {
            this.model.push(entry).write();
        } else if (this.model.isObject()) {
            this.model.set(entry).write();
        }
    }
    remove(props) {
        this.model.remove(props).write();
    }
    get(props, sortby, limit) {
        if (props) {
            return this.model.find(props).value();
        }
        return this.model.value();
    }
}


module.exports = JsonModel