import React, { Component, Suspense } from 'react';
import AutoRouter from 'libs/AutoRouter.js';
import {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
} from '@coreui/react';
import { AppAction } from 'reducers/app';
import AppBreadcrumb from 'components/AppBreadcrumb';
import AppSidebarNav from 'components/AppSidebarNav';
import Native from 'libs/Native';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toggleClasses from '@coreui/react/lib/Shared/toggle-classes';
import {
    asideMenuCssClasses,
    validBreakpoints,
    checkBreakpoint,
} from '@coreui/react/lib/Shared/index';

import { ModalBox } from 'components/ModalBox';
import Aside from './Aside';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

export class DefaultLayout extends Component {
    constructor() {
        super();
        this.modalToggle = this.modalToggle.bind(this);
    }
    loading() {
        return <div className="animated fadeIn pt-1 text-center">Loading...</div>
    }

    signOut(e) {
        e.preventDefault();
        this.props.history.push('/login');
    }
    loadUIFile(packageName, uiFile) {
        const { PathHelper } = Native();
        const ymlPath = [PathHelper.getDashSpace(packageName), uiFile].join(
            '/'
        );
        AppAction.loadUISchemaPath(ymlPath);
    }

    toggleAside(force) {
        const [display, mobile] = ['lg', false];
        let cssClass = asideMenuCssClasses[0];
        if (!mobile && display && checkBreakpoint(display, validBreakpoints)) {
            cssClass = `aside-menu-${display}-show`;
        }
        toggleClasses(cssClass, asideMenuCssClasses, force);
    }
    modalToggle() {
        AppAction.closeModal();
    }
    render() {
        const { TopMenus, TopRightButtons, SideMenus } = this.props.config;
        const { routes, modal } = this.props;
        const openAside = this.props.processes.length > 0;
        const modalProps = modal.length > 0 && modal[modal.length - 1];
        this.toggleAside(openAside);
        return (
            <div className="app">
                <ToastContainer />
                <ModalBox
                    isOpen={modal.length > 0}
                    {...modalProps}
                    toggle={this.modalToggle}
                />
                <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader
                            navs={TopMenus}
                            rightNavs={TopRightButtons}
                            showToggle={true}
                            onConform={modalProps && modalProps.onConform}
                            onLogout={e => this.signOut(e)}
                            {...this.props}
                        />
                    </Suspense>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <AppSidebarNav
                                navConfig={SideMenus}
                                loadFile={this.loadUIFile}
                                schemaRoute={'/schemabuilder'}
                                {...this.props}
                            />
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes} />
                        <Suspense fallback={this.loading()}>
                            <AutoRouter
                                routes={this.props.routes}
                                {...this.props}
                            />
                        </Suspense>
                    </main>

                    <AppAside fixed>
                        <Aside />
                    </AppAside>
                </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}
