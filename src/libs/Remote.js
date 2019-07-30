import { remote } from 'electron';
export const Remote = () => {
    const ContentHelper = remote.require('../backend/app/helpers/content-helper');
    const PathHelper = remote.require('../backend/app/helpers/path-helper');
    const Constants = remote.require('../backend/app/constants');
    const ProcessManager = remote.require('../backend/app/process-manager');
    const ContentLoader = remote.require('../backend/app/content-loader');
    const BackendStore = remote.require('../backend/app/store/index');
    const Config = remote.require('../backend/configs/config');
    const Notifier = remote.require('node-notifier');
    const DashpadApi = remote.require('../backend/app/context/dashpad_api.js');
    const ModuleHelper = remote.require('../backend/app/helpers/module_helper.js');
    const Utils = remote.require('../backend/libs/utils.js');
 
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
        Utils
    }

}