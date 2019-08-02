import React, { Component } from 'react';
import Documents from '../MdxFiles';
import _ from 'lodash';
export const SubRoutes = Object.keys(Documents).map(key => {
    const mdxModule = Documents[key].default;
    const { config } = Documents[key];
    const path = key.replace('./', '');
    const { menu, icon } = config || {};
    mdxModule.Config = () => {
        return {
            path: `docs/${path}`,
            component: mdxModule,
            name: menu|| path,
            route: `${path}`,
        };
    };
    const category = path.split('/')[0].slice(2);
    mdxModule.subMenus = [
        {
            title: true,
            name: category,
            wrapper: {
                // optional wrapper object
                element: '', // required valid HTML5 element tag
                attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: '', // optional class names space delimited list for title item ex: "text-center"
        },
        {
            name: menu || path,
            url: `/docs/${path}`,
            icon: icon || 'icon-notebook',
        },
    ];
    return mdxModule;
});
const sideMenus = [].concat.apply([], SubRoutes.map(route => route.subMenus));

const uniqueArray = _.uniqBy(sideMenus, 'name');

uniqueArray.push({
    name: 'Download',
    url: 'https://github.com/etamity/dashpad/releases',
    variant: 'success',
    class: 'mt-auto',
    icon: 'icon-cloud-download',
},{
    name: 'Github',
    url: 'https://github.com/etamity/dashpad',
    variant: 'danger',
    icon: 'icon-social-github',
},
);

export default [...uniqueArray];
