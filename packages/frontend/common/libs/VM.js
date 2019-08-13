const compiler = require('@nx-js/compiler-util');

const AllowedScopes =
    'setInterval,setTimeout,fetch,FileReader,require,DOMParser,Promise,setInterval,console,Array,ArrayBuffer,Boolean,Date,DateTimeFormat,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,EvalError,Float32Array,Float64Array,Function,Infinity,Intl,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,NumberFormat,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,uneval,URIError,document';
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
        const allCode = [
            this.getCode(),
            code
        ].join('\n');
        const isFunction = this.checkIfFunction(allCode);
        let compileredCode = compiler.compileCode(isFunction ? 'return (' + allCode +')();': allCode);
        compileredCode.call(null, {...this.globals});
    }

    getCode() {
        let code = '"use strict";\n';
        code += this.preloadCode.join(';\n');
        return code;
    }
    addCode(code) {
        this.preloadCode.push(code);
    }

    run(code, ctx={}, args={}) {
        if (!code) return;
        const isFunction = this.checkIfFunction(code);
        let compileredCode = compiler.compileCode(isFunction ? 'return (' + code +')();': code);
        compileredCode = compileredCode.bind(ctx, {...this.globals, ...args});
        console.log(compileredCode);
        compileredCode();
    }

    getParamNames(func) {
        const fnStr = func.toString().replace(STRIP_COMMENTS, '');
        let result = fnStr
            .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
            .match(ARGUMENT_NAMES);
        if (result === null) result = [];
        return result;
    }
    extractArrayFuncBody(func) {
        const matches = func
            .toString()
            .match(/^(?:\s*\(?(?:\s*\w*\s*,?\s*)*\)?\s*?=>\s*){?([\s\S]*)}?$/);
        if (!matches) {
            return null;
        }

        const firstPass = matches[1];
        const secondPass =
            (firstPass.match(/{/g) || []).length ===
            (firstPass.match(/}/g) || []).length - 1
                ? firstPass.slice(0, firstPass.lastIndexOf('}'))
                : firstPass;

        return secondPass;
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
