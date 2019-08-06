import { remote } from 'electron';
export const Remote = () => {
    const ContentHelper = remote.require('@dashpad/core/app/helpers/content-helper');
    const PathHelper = remote.require('@dashpad/core/app/helpers/path-helper');
    const Constants = remote.require('@dashpad/core/app/constants');
    const ProcessManager = remote.require('@dashpad/core/app/process-manager');
    const ContentLoader = remote.require('@dashpad/core/app/content-loader');
    const BackendStore = remote.require('@dashpad/core/app/store/index');
    const Config = remote.require('@dashpad/core/configs/config');
    const Notifier = remote.require('node-notifier');
    const DashpadApi = remote.require('@dashpad/core/app/context/dashpad_api.js');
    const ModuleHelper = remote.require('@dashpad/core/app/helpers/module_helper.js');
    const Utils = remote.require('@dashpad/core/libs/utils.js');
 
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
