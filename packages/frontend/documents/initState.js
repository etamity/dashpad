import { Remote } from 'common/libs/Remote';
import { RouteBuilder, NavBuilder } from 'common/libs/NavsBuilder.js';
import { currentRoute } from 'common/libs/AutoRouter';
import TopMenus from './config/TopMenus';

import * as Plugins from './plugins';

const { Utils, BackendStore } = Remote();

const config = NavBuilder(Plugins, TopMenus);

const routes = RouteBuilder(Plugins);

const initState = {
    config,
    routes,
    current: currentRoute(routes, window.location.hash),
    uiSchema: null,
    keyPathVars: {},
    packageInfo: null,
    modal: [],
    system: {
        ip: Utils.getLocalIp(),
    },
};

BackendStore.set('app', JSON.parse(JSON.stringify(initState)));

export default initState;
