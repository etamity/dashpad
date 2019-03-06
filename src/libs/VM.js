const FundationTypes = "window,__cjsWrapper,require,__core-js_shared__,setTimeout,console,true,false,Array,ArrayBuffer,Boolean,Collator,DataView,Date,DateTimeFormat,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,EvalError,Float32Array,Float64Array,Function,Infinity,Intl,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,NumberFormat,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,document";
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;

class VM {
    constructor(context) {
        this.context = context || {};
        this.globals = this.context.globals || [];
        this.preloadCode = [];
        this.events = {};
    }

    sandbox(code, ctx, funcParams, funcArgs) {
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
            let ignoreArgs = FundationTypes.split(',');

            for (let param in locals) {
                if (locals.hasOwnProperty(param)) {
                    let contained = ignoreArgs.indexOf(param) > -1;
                    if (!contained) {
                        args.push(locals[param]);
                        params.push(param);
                    }
                }
            }

            for (let param in globals) {
                args.push(globals[param]);
                params.push(param);
            }

            let context = Array.prototype.concat.call(
                that,
                params,
                funcParams,
                code
            ); // create the parameter list for the sandbox (flattern array)
            let sandboxContext = new (Function.prototype.bind.apply(
                Function,
                context
            ))(); // create the sandbox function
            context = Array.prototype.concat.call(that, args, funcArgs); // create the argument list for the sandbox
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
    run(code, ctx, ...args) {
        if (!code) return;
        const allCode = [this.getCode(), code].join('\n');
        this.sandbox(allCode, ctx, ...args)();
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
    func(code, ctx, args) {
        if (!code) return;
        const isFunc = this.checkIfFunction(code);
        if (isFunc) {
            const argNames = this.getParamNames(code);
            let funcBody = code.slice(code.indexOf('=>')+2);
                funcBody =funcBody.slice(funcBody.indexOf('{') + 1, funcBody.lastIndexOf('}'))
                .trim();
                
            if (argNames.length > 0) {
                this.run(funcBody, ctx, argNames, args);
            } else {
                this.run(funcBody, ctx);
            }
        } else {
            this.run(code, ctx);
            console.error('No defined function assign to an event !');
        }
    }
    addModule(name, obj) {
        this.modules[name] = obj;
    }
    deleteModule(name) {
        delete this.modules[name];
    }
    addGlobal(name, obj) {
        this.globals[name] = obj;
    }
    deleteGlobal(name) {
        delete this.globals[name];
    }
}

export default VM;
