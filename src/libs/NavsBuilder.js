export const NavBuilder = (
    components,
    defaultTopMenus = [],
    defaultSideMenus = [],
    defaultRightMenus = []
) => {
    const configArr = Object.keys(components)
        .filter(name => !!components[name].Config)
        .map(name => {
            return components[name].Config();
        });

    const navsArr = configArr
        .filter(config => !!config.SideMenus)
        .map(config => config.SideMenus);

    const navs = [].concat.apply(defaultSideMenus, navsArr);

    const topNavsArr = configArr
        .filter(config => !!config.TopMenus)
        .map(config => config.TopMenus);

    const topNavs = [].concat.apply(defaultTopMenus, topNavsArr);

    const rightNavsArr = configArr
        .filter(config => !!config.TopRightButtons)
        .map(config => config.TopRightButtons);

    const rightNavs = [].concat.apply(defaultRightMenus, rightNavsArr);
    return {
        TopMenus: topNavs,
        SideMenus: {
            items: navs,
            isOpen: true,
        },
        TopRightButtons: rightNavs,
    };
};

export const RouteBuilder = (components, base = '') => {
    const routes = Object.keys(components).map((name, index) => {
        const component = components[name];
        const config = (component.Config && component.Config()) || {};
        const path = [base, name].join('/').toLowerCase();
        const route = {
            path,
            component,
            key: index + 1,
            name: config.name || name,
            config,
        };
        const { SubRoutes } = config;

        if (SubRoutes) {
            route.routes = RouteBuilder(SubRoutes, route.path);
        }
        return route;
    });

    return routes;
};
