import { AppAction } from 'common/reducers/app';
export default [
    {
        url: '/dashboard/settingsview',
        icon: 'icon-settings navbar-toggler',
    },
    {
        icon: 'fa fa-terminal',
        attributes: {
            onClick: ()=> {
                AppAction.showLogsModal(true);
            }
        }
    }
];
