const compiler = require('@nx-js/compiler-util');

const FundationTypes =
    'setInterval,fetch,__cjsWrapper,FileReader,require,__core-js_shared__,DOMParser,Promise,setTimeout,setInterval,console,true,false,Array,ArrayBuffer,Boolean,Collator,DataView,Date,DateTimeFormat,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,EvalError,Float32Array,Float64Array,Function,Infinity,Intl,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,NumberFormat,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,document';
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;



class VM {
    constructor(context) {
        this.context = context || {};
        this.globals = this.context.globals || [];
        this.preloadCode = [];
        compiler.expose(...FundationTypes.split(','));
        const code = compiler.compileCode('console.log("this", this); return prop1 + prop2');
        const sum = code.call({test: 'hahah'}, {prop1: 1, prop2: 2}) 
        console.log('sum', sum);
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
        const allCode = [
            this.getCode(),
            code
        ].join('\n');
        const compileredCode = compiler.compileCode(allCode);
        this.context.vm = compileredCode;
        this.context.vm.call(ctx, args);
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

        // Needed because the RegExp doesn't handle the last '}'.
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
        FundationTypes.push(name);
    }
    getGlobal(name) {
        return this.globals[name];
    }
}
const vm = new VM();

export default vm;
