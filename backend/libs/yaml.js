const yaml = require('js-yaml');
const nodePath = require('path');
const fs = require('fs');

let root = null;

const YAMLObject = (path) => {
    const resolvePath = nodePath.resolve(root, path);
    return yaml.safeLoad(fs.readFileSync(resolvePath, 'utf8'), { schema: IMPORT_SCHEMA});
}
  
const ImportYamlType = new yaml.Type('!import', {
    // Loader must parse sequence nodes only for this type (i.e. arrays in JS terminology).
    // Other available kinds are 'scalar' (string) and 'mapping' (object).
    // http://www.yaml.org/spec/1.2/spec.html#kind//
    kind: 'scalar',

    // Loader must check if the input object is suitable for this type.
    resolve: function(data) {
        // `data` may be either:
        // - Null in case of an "empty node" (http://www.yaml.org/spec/1.2/spec.html#id2786563)
        // - Array since we specified `kind` to 'sequence'
        return data !== null && typeof data === 'string';
    },

    // If a node is resolved, use it to create a Point instance.
    construct: function(data) {
        return YAMLObject(data);
    },

    // Dumper must process instances of Point by rules of this YAML type.
    instanceOf: YAMLObject,

    // Dumper must represent Point objects as three-element sequence in YAML.
    represent: function(json) {
        return json;
    },
});
const IMPORT_SCHEMA = yaml.Schema.create(ImportYamlType);

const load = (path) => {
    const resolvePath = nodePath.resolve(path);
    root= resolvePath.substring(0, resolvePath.lastIndexOf('/'));
    return yaml.safeLoad(fs.readFileSync(resolvePath, 'utf8'), { schema: IMPORT_SCHEMA});
};
const read = (yaml) => {
    return yaml.safeLoad(yaml, { schema: IMPORT_SCHEMA});
};


module.exports = {
    load,
    read
};