export const Remote = () => {
    const ContentHelper = {
        loadConfigs: () => {},
        loadNavs: () => {},
        loadJson: () => {},
        loadFile: () => {},
        loadPackageJson: () => {},
        isExist: () => {},
    };
    const PathHelper = {
        WORKSPACE: '',
        PACKAGES: '',
        getDashSpace: () => {},
        getDashConfigFile: () => {},
        getPackageJsonFile: () => {},
        getAllDashSpace: () => {},
        getAllPackagesName: () => {},
        getAllDashConfigFiles: () => {},
        getAllPackageJsonFiles: () => {},
        getPackagePath: () => {},
        getCurrentDashSpace: () => {},
        getCurrentPackagePath: () => {},
    };

    const Constants = require('../backend/app/constants');
    const ProcessManager = {
        kill: () => {},
        send: () => {},
        start: () => {},
    };
    const ContentLoader = {
        reloadScript: () => {},
        reloadConfig: () => {},
        reloadUISchema: () => {},
    };
    const BackendStore = require('../backend/app/store/index');
    const Config = {
        set: () => {},
        get: () => {},
        delete: () => {},
        push: () => {},
        value: () => {},
        saveToFile: () => {},
    };
    const Notifier = {
        notify: () => {}
    };
    const DashpadApi = require('./dashpad_api.js');
    const ModuleHelper = {
        install: () => {},
        uninstall: () => {},
    };
    const Utils = require('../backend/libs/utils.js');

    return {
        ProcessManager,
        ContentHelper,
        PathHelper,
        Constants,
        ContentLoader,
        BackendStore,
        Config,
        Notifier,
        DashpadApi,
        ModuleHelper,
        Utils,
    };
};
