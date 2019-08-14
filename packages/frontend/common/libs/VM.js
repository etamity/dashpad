const compiler = require('@nx-js/compiler-util');

const AllowedScopes =
    'Dashpad,setInterval,setTimeout,fetch,FileReader,require,DOMParser,Promise,setInterval,console,Array,ArrayBuffer,Boolean,Date,DateTimeFormat,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,EvalError,Float32Array,Float64Array,Function,Infinity,Intl,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,NumberFormat,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,uneval,URIError,document';

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;

class VM {
    constructor(context) {
        this.context = context || {};
        this.globals = this.context.globals || [];
        this.preloadCode = [];
        compiler.expose(...AllowedScopes.split(','));
    }
    buildVmScope(code) {
        if (!code) return;
        this.preloadCode = [];
        this.addCode(code);
        let compileredCode = compiler.compileCode(this.getCode());
        compileredCode.call(null, { });
    }
    getCode() {
        return this.preloadCode.join(';\n');
    }
    addCode(code) {
        this.preloadCode.push(code);
    }
    run(code, ctx = {}, args = {}) {
        if (!code) return;
        const argNames = this.getParamNames(code);
        const funcbody = this.extractFuncbody(code);
        const allCode = [this.getCode(), funcbody].join('\n');
        let compileredCode = compiler.compileCode(allCode);
        compileredCode.call(ctx, { [argNames]: args });
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
    addGlobal(name, obj) {
        this.globals[name] = obj;
    }
    deleteGlobal(name) {
        delete this.globals[name];
    }
    addAllowGlobal(name) {
        AllowedScopes.push(name);
    }
    getGlobal(name) {
        return this.globals[name];
    }
}
const vm = new VM();

export default vm;
