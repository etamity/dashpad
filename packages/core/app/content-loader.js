const ContentHelper = require('./helpers/content-helper');
const WebContent = require('./web-content');
const { AppEventType, ActionEventType, UIEventType } = require('./constants');
const configHelper = require('@dashpad/config')
const electronOauth2 = require('@dashpad/oauth');

const reloadConfig = () => {
    const navs = ContentHelper.loadNavs();
    if (navs) {
        const action = {
            type: AppEventType.ON_LOAD_NAVS,
            payload: { navs },
        };
        WebContent.sendToUI(ActionEventType, action);
    }
};

const reloadUIFile = (filePath, vars) => {
    const action = {
        type: AppEventType.ON_LOAD_UI,
        payload: { filePath, vars },
    };
    WebContent.sendToUI(ActionEventType, action);
};

const reloadScript = jsPath => {
    const action = {
        type: AppEventType.ON_LOAD_SCRIPT,
        payload: { jsPath },
    };
    WebContent.sendToUI(ActionEventType, action);
};

const githubLogin = (domain, endpoint) => {
    if (domain && endpoint) {
        configHelper.set('settings.platform.github.domain', domain);
        configHelper.set('settings.platform.github.endpoint', endpoint);
    }
    global.mainWindow.webContents.session.clearStorageData();
    const github = configHelper.getPlatform('github');
    const windowParams = {
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false
        }
      }
    
      const githubOauth = electronOauth2.github(github, windowParams);
      githubOauth.getAccessToken(github.options)
      .then(token => {
        // use your token.access_token
        configHelper.set('settings.platform.github.authtoken', token.access_token);
        const action = {
            type: UIEventType.LOGIN,
            payload: {},
        };
        WebContent.sendToUI(ActionEventType, action);
        console.log(token);
        // githubOauth.refreshToken(token.refresh_token)
        //   .then(newToken => {
        //     //use your new token
        //   });
      });
}
const githubLogout = () => { 
    global.mainWindow.webContents.session.clearStorageData();
    const action = {
        type: UIEventType.LOGOUT,
        payload: {},
    };
    WebContent.sendToUI(ActionEventType, action);
}
module.exports = {
    reloadScript,
    reloadConfig,
    reloadUIFile,
    githubLogin,
    githubLogout
};
