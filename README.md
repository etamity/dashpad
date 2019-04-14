# Dashpad

A hackable universal dashboard framework for your desktop task automation and visualise tooling.

[docs](https://etamity.github.io/dashpad/)

## Video Demo

[![Screens](https://github.com/etamity/dashpad/blob/master/screenshots/Screenshot-1.png?raw=true)](https://youtu.be/xdE6z8N6nyw)

[Tutorial Module](https://github.com/etamity/dashpad-tutorial)

## Environment Requirement

- Node >= v8.12

    If you get `Unexpected token function` error, which mean you need to change node version.

## Install

`npm i`

## Start

`npm start`

## Build

Your build version will be under `build` folder.

`npm run build && npm run pack:mac`

or

`npm run build && npm run pack:win`

## Config

The application config file is in `/db/db.json`, you can change the window size and port etc.

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

If you wish to use `dashpad` command, run npm global install and link it inside your project root folder.

`npm i -g & npm link`

and then you can run `dashpad` in the terminal to open the dashpad.

The default work workspace directory will be under `/Users/${username}/documents/dashpad`

# Dev Guide

## Integrate your node module

### Step 1

Create new folder in `/Users/${username}/documents/dashpad/packages/${your_module}`, and open terminal in your module folder,

`npm init`

to create package.json

and create an `index.js` file in the folder, with below code:

```js
module.exports = function(params) {
    Dashpad.showToast({ message: 'hello form module' });
};
```

`Dashpad` is a global object that you can access dashpad api here.

### Step 2

Create `_dash/config.yml` file, and copy the menu items as below:

```yaml
---
navs:
    - name: My First Module
      icon: icon-speedometer
      isOpen: true
      goto: ui.yml # Your entry ui file
      badge:
          variant: info
          text: NEW
```

Now restart dashpad, you will see the new side menu `My First Module`.

### Step 3

Create `_dash/ui.yaml` file and fill the ui schema:

```yaml
---
Tabs:
    activeTab: 0
    Card:
        label: The first Tab
        Header:
            title: A registration form
        Form:
            Button_notification:
                label: Notification
                onClick: >
                    (e) => {
                        Dashpad.showNotification({
                        title: 'Notification title',
                        message: 'Notification message'
                        });
                        console.log('e', e, 'this', this);
                    }
```

and now go back to dashpad and click side menu `My First Module`, you will see new you ui has been created.

if click `Notification` button, you will recevie a notification.

### **Note**

If you want to split the js code from yml file into a external js file,  you can just create a js file with exact same name as yaml file, and write logic or function in that js file, Dashpad will preload the code for yaml file usage.

e.g

If `_dash/ui.yaml` file exist already then create another js file call `_dash/ui.js`, so that you can write js code in the file.

> ui.js
``` js
const onTabsMount = () => {
    console.log('Tab Mounted');
}

const onTabsChanged = () => {
    console.log('Tab Changed');
}

console.log('This code is loaded');

```

and then you can call `onTabsMount` in component events, such as `onClick`, `onMount`, `onWillMount` etc.

```yaml
---
Tabs:
    activeTab: 0
    onMount: >
        (e) => {
            onTabsMount();
        }
    onChange: >
        (e) => {
            onTabsChanged();
        }
    Card:
        label: The first Tab

        Header:
            title: A registration form
```

Now check the console, will find message `'This code is loaded'` is there, and then is `'Tab Mounted'`, if change the tab will see the output `'Tab Changed'`.

## Yaml Spliting

You can split yaml file into sub component files, but have to named the file start with `@`, e.g `@filename.yml`, this is for recognising the file as a component, so when you update the component file, it will only re-render main entry file.

e.g

```yaml
Tabs:
    Slot_1: !import components/@Card_dashpad.yml
    Slot_2: !import components/@Card_test.yml
```

`Slot` is a warpper component which doesn't doing anything on appearance, it's useful to organise structure or import sepreated file components.

## This Context

You can access `this` ref in any events, such as `onClick`, `onMount`, `onWillMount` etc. 

```yaml
Container:
    Collapse:
      isOpen: true
      List:
        items:
            - Some example text!
            - another example text!
    Button:
      label: Get Context
      position: left
      brand: linkedin
      onClick: >
        (e) => {
          console.log(this);

          const brand = this.get('brand');

          const isOpen = this.getSibling('Collapse.isOpen');

          const newButtonLabel = (isOpen ? 'isOpen' : 'isClosed') 

          this.set('label', newButtonLabel+ ' : ' + brand);

          this.setSibling('Collapse.isOpen', !isOpen);
        }
```

`this.props` refer to the event target itself, you can direct acces target's props, keypath, type, name etc.

`this.get` refer to the event target itself, you can access target's props;

`this.set` refer to the event target itself, you can set target's props value directly;

`this.setSibling` refer to the event target sibling, you can set sibling's props value directly;

`this.getSibling` refer to the event target sibling, you can get sibling's props value directly;

**If you want to access parent node's props, the only way to access is to set $vars variables, make it global, as when you want to access cross tree node's state, it suppose to be global state.**

## UI Schema

The yaml ui schema is a tree structure file, when dashpad parse the ui, it alwasy will look for the key name of the object, the format will look like `Type_name`. E.g. `Tabs_mytabs`

Dashpad will parse `Tabs_mytabs` as `Tabs` component and the component name is `Tabs_mytabs`.

**Important** :  `Type_name` the `Type` must start with capital character, so Dashpad will recognise it is a component Type, otherwise will parse it as an attribute.

## Components

-   #### **[Container](#container-1)**
-   #### **[Tabs](#tabs-1)**
-   #### **[Card](#card-1)**
-   #### **[Collapse](#collapse-1)**
-   #### **[Form](#form-1)**
-   #### **[Row](#row-1)**
-   #### **[Button](#button-1)**
-   #### **[Input](#input-1)**
-   #### **[Field](#field-1)**
-   #### **[Checkbox](#checkbox-1)**
-   #### **[Radio](#radio-1)**
-   #### **[Link](#link-1)**
-   #### **[Select](#select-1)**
-   #### **[Switch](#switch-1)**
-   #### **[Badge](#badge-1)**
-   #### **[Markdown](#markdown-1)**
-   #### **[List](#list-1)**
-   #### **[Html](#html-1)**
-   #### **[Table](#table-1)**
-   #### **[Buttongroup](#buttongroup-1)**
-   #### **[Progress](#progress-1)**
-   #### **[Text](#text-1)**

---

-   ### **Container**

```yaml
Container:
    Card:
    Text:
        position: center
        content: this is a container
```

-   ### **Tabs**

```yaml
Tabs:
    activeTab: 0
    Card_1:
        label: tab1
    Card_2:
        label: tab2
```

-   ### **Card**

```yaml
Card:
    label: tab1
    Header:
        title: card title
        Button_1:
            label: left button
            position: left
        Button_2:
            label: right button
            position: right
    Form:
        Username:
            type: text
            value: joey
```

-   ### **Collapse**

```yaml
Collapse:
    isOpen: false
    Card:
        title: card title
Button_control:
    label: button to control collapse
    onClick: >
        (e) => {
            Dashpad.setVars('isOpen', !isOpen);
        }
```

-   ### **Form**

```yaml
Form:
    Username:
      type: text
      label: Username
      tooltip: Choose your username
      value: First name
      prepend:
        - type: button
          icon: icon-drop
          color: warning
      append:
        - type: text
          icon: icon-drop
          label: hajajaj
          color: success
    Password:
      type: password
      label: Password
      tooltip: Please input the password
```

-   ### **Row**

One row with equally width colums

```yaml
Row:
    fluid: 'true'
    Username:
        type: text
        value: joey
        label: Username
        tooltip: Please input your username
    Password:
        type: password
        value: 1234
        label: Password
        tooltip: Please input your password
```

Also you can specify `col` props in child components

```yaml
Row:
  fluid: 'true'
  Username:
      col:
          md: 8   # Bootstrap 12 colums in one row
          lg: 4
      type: text
      value: joey
      label: Username
      tooltip: Please input your username
  Password:
      col:
          md: 4   # Bootstrap 12 colums in one row
          lg: 8
      type: password
      value: 1234
      label: Password
      tooltip: Please input your password
```

-   ### **Button**

```yaml
Button:
    brand: twitter
    label: Run Script
    color: success
    icon: icon-drop
    disabled: false
    outline: false
    size: md
    className: ''
    onClick: >
        console.log('Button clicked')
```

-   ### **Input**

Input component can specific type as ['text', 'password', 'number', 'email', 'textarea','datetime', 'time', 'date']

```yaml
Input:
    type: date # ['text', 'password', 'number', 'email', 'textarea','datetime', 'time', 'date']
    label: Birthday
    tooltip: Please Input Your Birthday
```

- ### **Field**

Field component can specific type as `Input`, `Button`, `RADIO`, `SELECT`, `CHECKBOX`, `SWITCH`

```yaml
Form:
  Field_input:
    type: text
    label: Text Field
  Field_button:
    type: button
    label: Button Field
  Field_radio:
    type: radio
    title: Radio Field
    options:
      - Male
      - Female
  Field_checkbox:
    type: checkbox
    title: Checkbox Field
    options:
      - Foot Ball
      - Piano
      - Games
      - Movies
  Field_select:
    type: select
    title: Select Field
    options:
      - London
      - York
      - Manchester
      - Liverpool
  Field_switch:
    type: switch
    label: Switch Field
    checked: true
    color: danger
```

-   ### **Checkbox**

```yaml
Hobbies:
    type: checkbox
    title: Foot Ball
    options:
      - Foot Ball
      - Piano
      - Games
      - Movies
```

-   ### **Radio**

```yaml
Gender:
  type: radio
  title: Gender
  inline: true
  options:
    - Male
    - Female
```

-   ### **Link**

Link component will open the link in browser

```yaml
Link:
    icon: icon-links
    link: http://somelink.com/
    label: Open the link
    color: danger
```

-   ### **Select**

```yaml
City:
  type: select
  title: City
  options:
    - London
    - York
    - Manchester
    - Liverpool
```

-   ### **Switch**

```yaml
RememberMe:
    type: switch
    label: Remember Me
    color: primary
    checked: true
```

-   ### **Badge**

```yaml
Badge:
    icon: icon-settingd
    color: primary
```

-   ### **Markdown**

````yaml
Markdown:
    content: >
        <h2>Full example</h2>

        ``` jsx
        console.log('this is test Markdown');
        ```
````

-   ### **List**

```yaml
List:
    items:
        - list item 1
        - list item 2
        - list item 3
        - content:
              title: list item 4
              description: this is list item 4 content
              Badge:
                  icon: icon-drop
                  label: new
```

-   ### **Html**

```yaml
Html:
    content: >
        <h1>You can put html in here<h1>
```

-   ### **Table**

```yaml
Table:
    labels: ['id', 'name', 'email', 'color']
    dataset:
        - ['1', 'joey', 'etamity@gmail.com', 'red']
        - ['2', 'joe', 'joey@gmail.com', 'blue']
        - ['3', 'jack', 'jack@gmail.com', 'green']
        - ['3', 'joseph', 'joseph@gmail.com', 'black']
```

-   ### **Buttongroup**

```yaml
Buttongroup:
    type: dropdown # ['group', 'toolbar', 'dropdown', 'wrap']
    label: Menu
    className: d-flex
    childClassName: m-1
    onClick: >
        (e) => {
            console.log('test group', this.e.target);
        }
    items:
        - label: Button 1
        - label: Button 2
        - label: Button 3
```

-   ### **Progress**

```yaml
Progress:
    color: primary
    value: 40
    max: 100
```

-   ### **Text**

```yaml
Text:
    tag: h3 #['h1', 'h2', ... , 'h6']
    content: this is the typograph component
    position: center # ['left', 'center', 'right']
    color: info # ['primary', 'info', 'warning', 'danger', 'white', 'black']
    weight: bold # ['ligth', 'normal', 'bold']
    transform: uppercase # ['uppercase', 'lowercase', 'capitalise']
```

## Dashpad Api

-   ### **getVars**

You can get variables value from `$vars` properties by keyPath,

e.g.

`Dashpad.getVars(keyPath);`

If you predefined key default value in the yaml file header under `$vars` key:

```yaml
---
$vars:
    username: Joey
    header: This is Header
    progress: 0
```

Then you can get the value simple pass they `username` key to getVars, it will return variables `username` value.

```js
Dashpad.getVars('username');  // return 'joey'
```

-   ### **setVars**

You can set variable value to all components where it refers to this variable,

e.g.

`Dashpad.setVars(keyPath, value);`

If you predefined key default value in the yaml file header under `$vars` key:

```yaml
---
$vars:
    username: Joey
    progress: 0
```

And you can set the props refers `${username}` and `${progress}` to these variable keys:

```yaml
---
Username:
    type: text
    label: Username
    tooltip: Please input your username
    value: ${username} # set the refers
Progress:
    value: ${progress} # set the refers
    max: 1000
    animated: true

```

Then you can set the value simple pass they `username` key to getVars, it will set `Username.value` and `Progress.value` props value.

```js
Dashpad.setVars('username', 'joseph');
// or
Dashpad.setVars({ keyPath: 'username', value: 'joseph' });
```

Or you can set mutiple value in one goal:

```js
Dashpad.setVars([
    { keyPath: 'username', value: 'Hello!!!!' },
    { keyPath: 'username', value: 'this will be set at same time!!!!' },
]);
```

-   ### **getVarsState**

You can get current state by keyPath,

e.g.

`Dashpad.getVarsState(keyPath);`

If you predefined key path in the yaml file header under `$vars` key:

```yaml
---
$vars:
    username: Tabs_1.Card_1.Row.Username.value
    header: Tabs_1.Card_1.Header.title
```

Then you can get the value simple pass they `username` key to getVarsState, it will return `Tabs_1.Card_1.Row.Username.value` state value.

```js
Dashpad.getVarsState('username');
```

-   ### **setVarsState**

You can get current state by keyPath,

e.g.

`Dashpad.setVarsState(keyPath, value);`

If you predefined key path in the yaml file header under `$vars` key:

```yaml
---
$vars:
    username: Tabs_1.Card_1.Row.Username.value
    header: Tabs_1.Card_1.Header.title
```

Then you can set the value simple pass they `username` key to getVars, it will set `Tabs_1.Card_1.Row.Username.value` state value.

```js
Dashpad.setVarsState('username', 'joseph');
// or
Dashpad.setVarsState({ keyPath: 'username', value: 'joseph' });
```

Or you can set mutiple value in one goal:

```js
Dashpad.setVarsState([
    { keyPath: 'username', value: 'Hello!!!!' },
    { keyPath: 'username', value: 'this will be set at same time!!!!' },
]);
```


-   ### **settings**

You can have your own scope settings variable by access `Dashpad.settings`

e.g.

```js
Dashpad.settings.get(keyPath); // get the settings under your package name
Dashpad.settings.set(keyPath, value); // set the variables under your package name
Dashpad.settings.push(keyPath, value); // push an element into an array under your package name
Dashpad.settings.delete(keyPath); // delete the variables under your package name
Dashpad.settings.value(); // get all Dashpad settings
```

If you have a node package name `sample_module`, and you can set your settings variable as below:

```js
Dashpad.settings.set('myToken', 'token_data'); // set the variables under your package name
```

Dashpad will save `token_data` value under `settings.sample_module.myToken`. You will see the settings in the dashboard settings view.

-   ### **getState**

You can get current state by keyPath,

e.g.

`Dashpad.getState(keyPath);`

```js
Dashpad.getState('Tabs_1.Card_1.Header.title');
```

-   ### **setState**

You can set current state by keyPath and value,

e.g.

`Dashpad.setState(keyPath, value);`

```js
Dashpad.setState('Tabs_1.Card_1.Header.title', 'Hello!!!!');
// or
Dashpad.setState({ keyPath: 'Tabs_1.Card_1.Header.title', value: 'Hello!!!!' });
```

Or you can set mutiple value in one goal:

```js
Dashpad.setState([
    { keyPath: 'Tabs_1.Card_1.Header.title', value: 'Hello!!!!' },
    {
        keyPath: 'Tabs_1.Card_1.Header.Button_1.label',
        value: 'this will be set at same time!!!!',
    },
]);
```

-   ### **showNotification**

e.g.

`Dashpad.showNotification({titile, message});`

```js
Dashpad.showNotification({
    titile: 'Hello world',
    message: 'This is notification',
});
```

-   ### **showToast**

e.g.

`Dashpad.showToast({message, options});`

```js
Dashpad.showToast({
    message: 'This is toast',
});
```

-   ### **showModal**

e.g.

`Dashpad.showModal({title, message, onConfirm});`

```js
Dashpad.showModal({
    title: 'show a modal'
    message: 'This is modal'
    });
```

-   ### **loadJson**

load Json file and return json object

e.g.

`Dashpad.loadJson(jsonfile);`

```js
const json = Dashpad.loadJson('somejson.json');
```

-   ### **run** (In Yaml file only)

Run node scirpt from yml file

e.g.

`Dashpad.run(nodeScript, parameters);`

```js
Dashpad.run('index.js', { obj: 'hey, node can get this parameter!' });
```

## VM Enviroment

The reason to have js VM library is to avoid global scope poisioning. All yml (frontend) script will be running in a closure function.

E.g

``` js
// VM filter the global object in frontend
(function anonymous(window..., Dashpad
) {
"use strict";

commonFunc('just loaded!!');

return function VMScope() {
  return {
    run: function run(code) {
      eval(code);
    },
    runEvent: function runEvent(code, e) {
      eval(code);
    }
  };
}()
})
```
So all global objects are being filtered, `window` object will be `undefined`.

## Github API

Dashpad has integrated official github rest sdk [@octokit/rest](https://github.com/octokit/rest.js), you can generate auth token on github setting, and set it up on Dashpad settings page, then get the Github object by

``` js
const { Github } = Dashpad.platform;

Github.search({q, ...});
```

By default if you didn't set up the auth token, the Github object will be empty.

# Dashpad Development

## Create New Plugin (Dashpad Source Code)

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


## Publish Your Tools/Plugins

Once you push your code, add `dashpad` topic on the github descirption area, your plugin will show up on the Dashpad main page, it will be nice to add README.md to tell a bit more about your plugin, let people know what it does.

## Routing

When you created new plugin, it will automatically create new route for you.
For example when you created a new plugin under `src/plugins/NewPlugin`, and export the plugin in the `src/plugins/index.js` file:

`export * from './NewPlugin';`

it will generate a new route `/newplugin`.

## Custom Style

Go to `src/sass` folder to change style, it's using [Bootstrap 4](https://getbootstrap.com/), [reactstrap](https://reactstrap.github.io/) and [Core UI](https://coreui.io/)

## Electron

All exports to renderer thread are under `/src/libs/Remote.js` which can be use in frontend. The reason to import it from frontend is for live reloading node code just by refreshing frontend page.

`backend/electron/main.js` are electron entry file.

All node backend operation function are under `/backend` folder.

## Route Map

## Notice

While running the application, two ports will be using. (8888, and 9999)