const FundationTypes =
    'setInterval,fetch,__cjsWrapper,FileReader,require,__core-js_shared__,DOMParser,Promise,setTimeout,setInterval,console,true,false,Array,ArrayBuffer,Boolean,Collator,DataView,Date,DateTimeFormat,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,EvalError,Float32Array,Float64Array,Function,Infinity,Intl,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,NumberFormat,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,document';
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;

const VMScope = () => {
    return {
        run: function(code) {
            /* eslint-disable no-eval */
            eval(code);
            /* eslint-enable no-eval */
        },
        runEvent: function(code, e) {
            /* eslint-disable no-eval */
            eval(code);
            /* eslint-enable no-eval */
        },
    };
};

class VM {
    constructor(context) {
        this.context = context || {};
        this.globals = this.context.globals || [];
        this.preloadCode = [];
    }

    sandbox(code, ctx, funcParams) {
        //create local versions of window and document with limited functionality
        let locals = {};
        let that = Object.create(ctx || null); // create our own context for the user code
        let globals = this.globals;
        function createSandbox(that, locals) {
            let params = []; // the names of local variables
            let args = []; // the local variables

            let keys = Object.getOwnPropertyNames(window);
            for (let i = 0; i < keys.length; ++i) {
                locals[keys[i]] = void 0;
            }

            delete locals['eval'];
            delete locals['arguments'];

            // Allowed types
            let allowedArgs = FundationTypes.split(',');

            const allParams = Object.assign(locals, globals, funcParams);

            for (let param in allParams) {
                if (allParams.hasOwnProperty(param)) {
                    let contained = allowedArgs.indexOf(param) > -1;
                    if (!contained) {
                        args.push(allParams[param]);
                        params.push(param);
                    }
                }
            }

            let context = Array.prototype.concat.call(that, params, code);

            // create the parameter list for the sandbox (flattern array)
            let sandboxContext = new (Function.prototype.bind.apply(
                Function,
                context
            ))(); // create the sandbox function
            context = Array.prototype.concat.call(that, args); // create the argument list for the sandbox

            let sandbox = Function.prototype.bind.apply(
                sandboxContext,
                context
            ); // bind the local variables to the sandbox
            return sandbox;
        }
        return createSandbox(that, locals); // create a sandbox
    }
    getCode() {
        let code = '"use strict";\n';
        code += this.preloadCode.join(';\n');
        return code;
    }
    addCode(code) {
        this.preloadCode.push(code);
    }

    buildVmScope(code, ctx, args) {
        if (!code) return;
        const allCode = [
            this.getCode(),
            code,
            `return ${VMScope.toString()}()`,
        ].join('\n');
        this.context.vm = this.sandbox(allCode, ctx, args)();
    }

    run(code, ctx, args) {
        if (!code) return;
        const isFunc = this.checkIfFunction(code);
        if (isFunc) {
            const argNames = this.getParamNames(code);
            let funcBody = code.slice(code.indexOf('=>') + 2);
            funcBody = funcBody
                .slice(funcBody.indexOf('{') + 1, funcBody.lastIndexOf('}'))
                .trim();

            if (argNames.length > 0) {
                this.context.vm.runEvent.call(ctx, funcBody, args);
            } else {
                this.context.vm.run.call(ctx, funcBody);
            }
        } else {
            this.context.vm.run.call(ctx, code);
            console.error(
                'No defined function assign to an event !',
                arguments[1]
            );
        }
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
console.log(vm);
export default vm;
