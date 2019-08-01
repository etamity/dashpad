import React, { Component } from 'react';
import Documents from '../MdxFiles';
import _ from 'lodash';
export const SubRoutes = Object.keys(Documents).map(key => {
    const mdxModule = Documents[key].default;
    const { config } = Documents[key];
    const path = key.replace('./', '');
    mdxModule.Config = () => {
        return {
            path: `docs/${path}`,
            component: mdxModule,
            name: (config && config.menu) || path,
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
            name: (config && config.menu) || path,
            url: `/docs/${path}`,
            icon: 'icon-speedometer',
        },
    ];
    return mdxModule;
});
const sideMenus = [].concat.apply([], SubRoutes.map(route => route.subMenus));

const uniqueArray = _.uniqBy(sideMenus, 'name');

export default [...uniqueArray];
