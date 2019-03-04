# Dashpad

A universal dashboard framework for your daily task, automation and vistualise tooling.

## Screenshots

<!-- ![Screens](https://joey-etamity/promo-kitchen/blob/master/screenshots/sc5.png?raw=true) -->

## Install

`yarn`

## Start

`yarn start`

## Build

Your build version will be under `build` folder.

`yarn run build && yarn run pack:mac`

or

`yarn run build && yarn run pack:win`

## Environment Parameters

Create a new `.env` file to preset the parameters.

```
PORT=8888
CHOKIDAR_USEPOLLING=true
NODE_PATH=src
SKIP_PREFLIGHT_CHECK=true
```
## Config

The application config file is in `/db/db.json`,  you can change the window size and port etc.

```json
{
  "config": {
    "port": 9999,
    "uiport": 8888,
    "host": "localhost",
    "window": {
        "width": 1308,
        "height": 1024,
        "show": false
    },
    ...
    }
```

## Cli Command

If you wish to use `dashpad` command, you global install and link it inside your project root folder.

`npm i -g & npm link`

and then you can run `dashpad` in the terminal to open the dashpad.

The default work workspace directory will be under `/Users/${username}/documents/dashpad`

if you run `dashpad .` will open the dashpad and workspace directory based on current execution path.

# Dev Guide

## Create New Plugin

To create new plugin, go to `src/plugins` and create new folder with `NewPlguin` style, and then create and index.js file as entry point.

### index.js

```javascript
export * from './NewPlguin';
```

Also you can copy the template `__SamplePlugin` folder, you can find it under `plugins` folder to start your new plugin.

### NewPlguin.js

```javascript
import React, { Component } from 'react';

export class NewPlguin extends Component {
    static Config() {
        return {
            name: 'New Plguin'
            SideMenus, // Side menu items
            TopRightIcons, //  Top right icon buttons
            SubRoutes: [],
            TopMenus, // Top menu (on left side)
            Aside, // Aside panel (if any)
        };
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Container />
            </div>
        );
    }
}
```

## Sidemenu

    configs/Menu.js

There are two main menu, `Top` menu and Side `menu`

Add MenuItem to `Side` menu

```javascript
const SideMenuItems = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
    },
    {
        name: 'Frontend Tools',
        url: '/frontendtools',
        icon: 'icon-wrench',
        badge: {
            variant: 'info',
            text: 'NEW',
        },
    },
];
```

Add menu item to `SideMenu` menu

```javascript
export class NewPlugin extends Component {
    static get Config() {
        return {
            SideMenu: SideMenuItems,
        };
    }
}
```

Each `SideMenu` menu item also can have submenu, and you can assign it to `children` array in the menu item.

SideMenu
Add sub menu into menu item

```javascript
    const SideMenuItems = [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer'
             children: [
            {
                name: 'Colors',
                url: '/dashboard/page1',
                icon: 'icon-drop',
                badge: {
                    variant: 'info',
                    text: 'NEW',
                }
            },
            {
                name: 'Typography',
                url: '/dashboard/page2',
                icon: 'icon-pencil',
            },
        ],
        },
        {
            name: 'Frontend Tools',
            url: '/frontendtools',
            icon: 'icon-wrench',
            badge: {
                variant: 'info',
                text: 'NEW'
            }
        }
    ];
```

## Routing

When you created new plugin, it will automatically create new route for you.
For example when you created a new plguin under `src/plugins/NewPlguin`, and export the plugin in the `src/plugins/index.js` file:

`export * from './NewPlguin';`

it will generate a new route `/newplguin`.

## Custom Style

Go to `src/sass` folder to change style, it's using [Bootstrap 4](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io/) and [Core UI](https://coreui.io/)

## Electron

All exports to renderer thread are under `/backend/app/index.js` which can be use in frontend.

`backend/electron/main.js` are electron entry file.

All node backend operation function are under `/backend` folder.

## Route Map


## Notice

While running the application, two ports will be using. (8888, and 8609)
