const path = require('path');
const { fork } = require('child_process');
const EventEmitter = require('events');
const BackendStore = require('./store');
const WebContent = require('./web-content');
const ContentHelper = require('./helpers/content-helper');
const PathHelper = require('./helpers/path-helper');
const {
    AppEventType,
    ProcessEventType,
    ActionEventType,
} = require('./constants');

const dispatch = children => {
    const action = {
        type: AppEventType.ON_LOAD_PROCESSES_CHILD,
        payload: {
            children: children.map(child => child.packageInfo),
        },
    };
    WebContent.sendToUI(ActionEventType, action);
};

class ProcessManager extends EventEmitter {
    constructor() {
        super();
        this.children = [];
        this.current = null;
    }
    refresh() {
        dispatch(this.children);
    }
    getByNamespace(namespace) {
        return this.children.find(child =>
            child.packageInfo.namespace.includes(namespace)
        );
    }

    getByPid(pid) {
        return this.children.find(child => child.pid === pid);
    }

    startProcess(script, params) {
        const { namespace, packageName } = BackendStore.get('app.packageInfo');
        const packageJson = ContentHelper.loadPackageJson(packageName);
        const packagePath = PathHelper.getPackagePath(packageName);
        const nodeScriptPath = [
            packagePath,
            script || packageJson.main || 'index.js',
        ].join('/');
        const loaderPath = path.resolve(__dirname + '/module-loader.js');
        const filePath = path.resolve(nodeScriptPath);
        let child;
        try {
            child = fork(loaderPath, [filePath, packagePath], {
                cwd: path.dirname(filePath)
            });

            child.packageInfo = {
                namespace,
                packageName,
                script,
                packageJson,
                pid: child.pid,
            };
            const action = {
                type: ProcessEventType.LOAD_MODULE_SCRIPT,
                payload: {
                    filePath,
                    params,
                    state: BackendStore.get(),
                },
            };
            //console.log('from Main: ', action.payload);
            child.send(action);
        } catch (error) {
            WebContent.sendErrorToUI(error.message);
        }
        return child;
    }

    start(script = 'index.js', parentmeters) {
        let child = this.getCurrent();
        if (!child) {
            child = this.startProcess(script, parentmeters);
            this.children.push(child);
            this.current = child;
            child.on('message', action => {
                if (!!action && typeof action === 'object') {
                    WebContent.sendToUI(ActionEventType, action);
                } else {
                    console.error(action);
                }
            });
            child.on('exit', () => {
                console.log('exit', child.pid);
                this.children = this.children.filter(
                    ch => ch.pid !== child.pid
                );
                dispatch(this.children);
            });
            dispatch(this.children);
        }

        return child;
    }
    getCurrent() {
        const { namespace } = BackendStore.get('app.packageInfo') || {
            namespace: null,
        };
        this.current = this.getByNamespace(namespace);
        return this.current;
    }

    kill(pid) {
        if (pid) {
            const child = this.getByPid(pid);
            if (child) {
                child.kill();
                this.children = this.children.filter(ch => ch.pid !== pid);
            }
        } else if (this.getCurrent()) {
            this.current.kill();
            this.children = this.children.filter(
                child => child.pid !== this.current.pid
            );
        }
        dispatch(this.children);
    }

    sendToAll(action) {
        this.children.forEach(child => child.connected && child.send(action));
    }
    send(action) {
        const child = this.getCurrent();
        if (child && child.connected) {
            child.send(action);
        }
    }

    clear() {
        this.children.forEach(child => child.kill());
        this.children = [];
    }
}

module.exports = new ProcessManager();
