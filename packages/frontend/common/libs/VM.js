const compiler = require('@nx-js/compiler-util');

const AllowedScopes =
    'window,clearInterval,setInterval,setTimeout,fetch,FileReader,require,DOMParser,Promise,setInterval,console,Array,ArrayBuffer,Boolean,Date,DateTimeFormat,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,EvalError,Float32Array,Float64Array,Function,Infinity,Intl,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,NumberFormat,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,uneval,URIError,document';

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;

class VM {
    constructor(context) {
        this.context = context || {};
        this.refs = {};
        this.globals = [];
        this.preloadCode = [];
        compiler.expose(...AllowedScopes.split(','));
    }
    buildVmScope(code) {
        if (!code) return;
        this.preloadCode = [];
        this.addCode(code);
        let compileredCode = compiler.compileCode(this.getCode());
        return compileredCode.call({ ...this.context }, { ...this.globals });
    }
    getCode() {
        return this.preloadCode.join(';\n');
    }
    addCode(code) {
        this.preloadCode.push(code);
    }
    run(code, ctx = {}, args = {}) {
        if (!code) return;
        const allCode = [this.getCode(), code].join('\n');
        let compileredCode = compiler.compileCode(allCode);
        return compileredCode.call(
            { ...ctx, ...this.context },
            { ...args, ...this.globals }
        );
    }
    eval(code, args = {}) {
        if (!code) return;
        const run = compiler.compileCode(code);
        return run({ ...args, ...this.globals });
    }
    runEvent(code, context, args) {
        if (!code) return;
        const argNames = this.getParamNames(code);
        const funcbody = this.extractFuncbody(code);
        this.run(funcbody, context, { [argNames]: args });
    }
    getParamNames(func) {
        const fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let result = fnStr
            .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
            .match(ARGUMENT_NAMES);
        if (result === null) result = [];
        return result;
    }
    extractFuncbody(code) {
        return code
            .slice(code.indexOf('{') + 1, code.lastIndexOf('}') - 1)
            .trim();
    }
    checkIfFunction(code) {
        return code.indexOf('function') > -1 || code.indexOf('=>') > -1;
    }
    addRef(keyPath, ref) {
        this.refs[keyPath] = ref;
    }
    getRef(keyPath) {
        return this.refs[keyPath];
    }
    addGlobal(name, obj) {
        this.globals[name] = obj;
    }
    deleteGlobal(name) {
        delete this.globals[name];
    }
    getGlobal(name) {
        return this.globals[name];
    }
}
const vm = new VM();

export default vm;
