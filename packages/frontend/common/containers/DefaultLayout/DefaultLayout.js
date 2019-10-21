import React, { Component, Suspense } from 'react';
import AutoRouter from 'common/libs/AutoRouter.js';
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
import { AppAction } from 'common/reducers/app';
import AppBreadcrumb from 'common/components/AppBreadcrumb';
import AppSidebarNav from 'common/components/AppSidebarNav';
import { Remote } from 'common/libs/Remote';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toggleClasses from '@coreui/react/lib/Shared/toggle-classes';
import {
    asideMenuCssClasses,
    validBreakpoints,
    checkBreakpoint,
} from '@coreui/react/lib/Shared/index';

import { ModalBox } from 'common/components/ModalBox';
import Aside from './Aside';
import LoadingSpinner from 'common/components/LoadingSpinner';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

export class DefaultLayout extends Component {
    constructor() {
        super();
        this.modalToggle = this.modalToggle.bind(this);
    }

    signOut(e) {
        e.preventDefault();
        this.props.history.push('/login');
    }
    loadUIFile(packageName, uiFile) {
        const { PathHelper } = Remote();
        const uiFilePath = [PathHelper.getDashSpace(packageName), uiFile].join(
            '/'
        );
        AppAction.loadUISchemaPath(uiFilePath);
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
        const openAside =
            !!this.props.processes && this.props.processes.length > 0;
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
                    <Suspense fallback={<LoadingSpinner />}>
                        <DefaultHeader
                            navs={TopMenus}
                            rightNavs={TopRightButtons}
                            showToggle={!!this.props.processes}
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
                                {...this.props}
                            />
                        </Suspense>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes} />
                        <Suspense fallback={<LoadingSpinner />}>
                            <AutoRouter
                                routes={this.props.routes}
                                {...this.props}
                                base={'/'}
                                indexRoute={'/docs/0.documents/0.index.mdx'}
                            />
                        </Suspense>
                    </main>

                    {!!this.props.processes && (
                        <AppAside fixed>
                            <Aside />
                        </AppAside>
                    )}
                </div>
                <AppFooter>
                    <Suspense fallback={<LoadingSpinner />}>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
            </div>
        );
    }
}
