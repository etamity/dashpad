(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{1367:function(e,a,t){"use strict";function n(e,a){if(null==e)return{};var t,n,s=function(e,a){if(null==e)return{};var t,n,s={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||(s[t]=e[t]);return s}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}t.d(a,"a",function(){return n})},1368:function(e,a,t){},1369:function(e,a,t){"use strict";a.__esModule=!0,a.default=function(e,a,t){var n=a.indexOf(e);a.slice(0,n).map(function(e){return document.body.classList.remove(e)}),!0===t?document.body.classList.add(e):!1===t?document.body.classList.remove(e):document.body.classList.toggle(e);return document.body.classList.contains(e)},e.exports=a.default},1370:function(e,a,t){"use strict";a.__esModule=!0,a.checkBreakpoint=a.validBreakpoints=a.asideMenuCssClasses=a.sidebarCssClasses=void 0;var n=t(1371);a.sidebarCssClasses=n.sidebarCssClasses,a.asideMenuCssClasses=n.asideMenuCssClasses,a.validBreakpoints=n.validBreakpoints,a.checkBreakpoint=n.checkBreakpoint},1371:function(e,a,t){"use strict";a.__esModule=!0,a.checkBreakpoint=function(e,a){return a.indexOf(e)>-1};a.sidebarCssClasses=["sidebar-show","sidebar-sm-show","sidebar-md-show","sidebar-lg-show","sidebar-xl-show"],a.asideMenuCssClasses=["aside-menu-show","aside-menu-sm-show","aside-menu-md-show","aside-menu-lg-show","aside-menu-xl-show"],a.validBreakpoints=["sm","md","lg","xl"]},1378:function(e,a,t){"use strict";t.r(a);var n,s=t(49),l=t(10),i=t(11),r=t(13),c=t(12),o=t(117),u=t(14),m=t(1),d=t.n(m),p=t(127),v=t(301),h=t(51),g=t(1367),b=t(201),f=t(297),k=t(787),E=t(9),O=t(3),y=t.n(O),j=t(16),C=t.n(j),N=function(e){var a=e.match,t=function(e){var a=C.a.flatMap(n,function(e){return e.routes&&[e].concat(Object(b.a)(e.routes))||e}).find(function(a){return e===a.path});return a&&a.name||null}(a.url);return t?a.isExact?d.a.createElement(E.d,{active:!0},t):d.a.createElement(E.d,null,d.a.createElement(f.a,{to:a.url||""},t)):null},w=function(e){var a=function(e){var a=["/"];return"/"===e?a:(e.split("/").reduce(function(e,t){var n="".concat(e,"/").concat(t);return a.push(n),n}),a)}(e.location.pathname).map(function(e,a){return d.a.createElement(k.a,{key:a.toString(),path:e,component:N})});return d.a.createElement(E.c,null,a)},x=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(r.a)(this,Object(c.a)(a).call(this,e))).state={routes:e.appRoutes},n=t.state.routes,t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){var e=this.props,a=e.className,t=e.tag,n=Object(g.a)(e,["className","tag"]);delete n.children,delete n.appRoutes;var s=y()(a);return d.a.createElement(t,{className:s},d.a.createElement(k.a,Object.assign({path:"/:path",component:w},n)))}}]),a}(m.Component);x.defaultProps={tag:"div",className:"",appRoutes:[{path:"/",exact:!0,name:"Home",component:null}]};var L=x,M=t(1365),T=t(199),B=t.n(T),R=(t(300),function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(r.a)(this,Object(c.a)(a).call(this,e))).handleClick=t.handleClick.bind(Object(o.a)(t)),t.activeRoute=t.activeRoute.bind(Object(o.a)(t)),t.hideMobile=t.hideMobile.bind(Object(o.a)(t)),t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"handleClick",value:function(e){e.preventDefault(),e.currentTarget.parentElement.classList.toggle("open")}},{key:"activeRoute",value:function(e,a){return a.location.pathname.indexOf(e)>-1?"nav-item nav-dropdown open":"nav-item nav-dropdown"}},{key:"hideMobile",value:function(){document.body.classList.contains("sidebar-show")&&document.body.classList.toggle("sidebar-show")}},{key:"navList",value:function(e){var a=this;return e.map(function(e,t){return a.navType(e,t)})}},{key:"navType",value:function(e,a){return e.title?this.navTitle(e,a):e.divider?this.navDivider(e,a):e.label?this.navLabel(e,a):e.children?this.navDropdown(e,a):this.navItem(e,a)}},{key:"navTitle",value:function(e,a){var t=y()("nav-title",e.class);return d.a.createElement("li",{key:a,className:t},this.navWrapper(e)," ")}},{key:"navWrapper",value:function(e){return e.wrapper&&e.wrapper.element?d.a.createElement(e.wrapper.element,e.wrapper.attributes,e.name):e.name}},{key:"navDivider",value:function(e,a){var t=y()("divider",e.class);return d.a.createElement("li",{key:a,className:t})}},{key:"navLabel",value:function(e,a){var t={item:y()("hidden-cn",e.class),link:y()("nav-label",e.class?e.class:""),icon:y()("nav-icon",e.icon?e.icon:"fa fa-circle",e.label.variant?"text-".concat(e.label.variant):"",e.label.class?e.label.class:"")};return this.navLink(e,a,t)}},{key:"navDropdown",value:function(e,a){var t=y()("nav-icon",e.icon);return d.a.createElement("li",{key:a,className:this.activeRoute(e.url,this.props)},d.a.createElement("a",{className:"nav-link nav-dropdown-toggle",href:"/#",onClick:this.handleClick},d.a.createElement("i",{className:t}),e.name,this.navBadge(e.badge)),d.a.createElement("ul",{className:"nav-dropdown-items"},this.navList(e.children.map(function(a){return Object(s.a)({packageName:e.packageName},a)}))))}},{key:"navItem",value:function(e,a){var t=!1;if(this.props.location.pathname.indexOf(this.props.schemaRoute)>-1){var n=this.props.packageInfo;n&&n.packageName===e.packageName&&n.fileName===e.goto&&(t=!0)}var s={item:y()(e.class),link:y()("nav-link",e.variant?"nav-link-".concat(e.variant):"","cursor-pointer",t?"active":""),icon:y()("nav-icon",e.icon)};return this.navLink(e,a,s)}},{key:"navLink",value:function(e,a,t){var n=this,s=e.url||"",l=d.a.createElement("i",{className:t.icon}),i=this.navBadge(e.badge),r=e.attributes||{},c=e.goto||"";return d.a.createElement(E.J,{key:a,className:t.item},r.disabled?d.a.createElement(E.K,Object.assign({href:"",className:t.link},r),l,e.name,i):this.isExternal(s)?d.a.createElement(E.K,Object.assign({href:s,className:t.link,active:!0},r),l,e.name,i):c.includes(".yml")?d.a.createElement(f.a,Object.assign({to:this.props.schemaRoute,className:t.link,onClick:function(){n.props.loadFile&&n.props.loadFile(e.packageName,c)}},r),l,e.name,i):d.a.createElement(M.a,Object.assign({to:s,className:t.link,activeClassName:"active",onClick:this.hideMobile},r),l,e.name,i))}},{key:"navBadge",value:function(e){if(e){var a=y()(e.class);return d.a.createElement(E.b,{className:a,color:e.variant},e.text)}return null}},{key:"isExternal",value:function(e){return"http"===(e?e.substring(0,4):"")}},{key:"render",value:function(){var e=this.props,a=e.className,t=e.children,n=e.navConfig,s=Object(g.a)(e,["className","children","navConfig"]);delete s.isOpen,delete s.staticContext,delete s.Tag;var l=y()(a,"sidebar-nav"),i="rtl"===getComputedStyle(document.querySelector("html")).direction;return d.a.createElement(B.a,Object.assign({className:l},s,{option:{suppressScrollX:!i}}),d.a.createElement(E.I,null,t||this.navList(n.items)))}}]),a}(m.Component));R.defaultProps={tag:"nav",navConfig:{items:[{name:"Dashboard",url:"/dashboard",icon:"icon-speedometer",badge:{variant:"info",text:"NEW"}}]},isOpen:!1};var S=R,I=t(126),P=t(84),D=(t(1368),t(1369)),F=t.n(D),_=t(1370),A=function(e){function a(){return Object(l.a)(this,a),Object(r.a)(this,Object(c.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){var e=this.props;return d.a.createElement(E.E,{isOpen:e.isOpen,toggle:e.toggle,className:"modal-".concat(e.variant," ")+this.props.className},d.a.createElement(E.H,{toggle:e.toggle}," ",e.title),d.a.createElement(E.F,null,e.message),d.a.createElement(E.G,null,d.a.createElement(E.e,{color:e.variant,onClick:function(){e.toggle&&e.toggle(),e.onConfirm&&e.onConfirm()}},"Confirm")," ",d.a.createElement(E.e,{color:"secondary",onClick:e.toggle},"Cancel")))}}]),a}(m.Component),J=t(781),z=Object(I.a)().ProcessManager,H=function(e){function a(e){var t;return Object(l.a)(this,a),(t=Object(r.a)(this,Object(c.a)(a).call(this,e))).toggle=t.toggle.bind(Object(o.a)(t)),t.state={activeTab:e.activeTab},t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"toggle",value:function(e){this.state.activeTab!==e&&this.setState({activeTab:e})}},{key:"render",value:function(){var e=this.props,a=(e.children,Object(g.a)(e,["children"]),this.props.processes.map(function(e,a){return function(e,a){return d.a.createElement(E.B,{key:a,className:"list-group-item-accent-warning list-group-item-divider"},d.a.createElement("div",{className:"float-right"},d.a.createElement(E.e,{size:"sm",color:"danger",onClick:function(){var a;h.a.showModal({title:"Kill Process",message:(a=e.pid,d.a.createElement("h6",null,"Are you sure to kill process pid ",d.a.createElement("b",null,a)," ?")),variant:"danger",onConfirm:function(){z.kill(e.pid)}})}}," ",d.a.createElement("i",{className:"icon-close"}))),d.a.createElement("div",null,d.a.createElement("strong",null,e.packageName)," "),d.a.createElement("small",{className:"text-muted mr-3"},d.a.createElement("i",{className:"icon-calendar"})," ",d.a.createElement("strong",null,e.script)),d.a.createElement("small",{className:"text-muted"},d.a.createElement("i",{className:"icon-location-pin"})," V"," ",e.packageJson.version),d.a.createElement(E.L,{animated:!0,color:"success",value:"100",className:"mt-3"}))}(e,a)}));a.unshift(d.a.createElement(E.B,{key:"title-index-0",className:"list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small"},"All Running Tasks"));var t={"[icon-list]":d.a.createElement(E.A,{className:"list-group-accent",tag:"div"}," ",a," ")};return d.a.createElement(d.a.Fragment,null,d.a.createElement(J.a,{tabs:t}))}}]),a}(m.Component);H.defaultProps={};var K=H,U=t(154),W=Object(U.connect)(function(e){return{processes:e.app.processes}})(K),q=d.a.lazy(function(){return t.e(5).then(t.bind(null,1376))}),G=d.a.lazy(function(){return t.e(4).then(t.bind(null,1377))}),V=function(e){function a(){var e;return Object(l.a)(this,a),(e=Object(r.a)(this,Object(c.a)(a).call(this))).modalToggle=e.modalToggle.bind(Object(o.a)(e)),e}return Object(u.a)(a,e),Object(i.a)(a,[{key:"loading",value:function(){return d.a.createElement("div",{className:"animated fadeIn pt-1 text-center"},"Loading...")}},{key:"signOut",value:function(e){e.preventDefault(),this.props.history.push("/login")}},{key:"loadUIFile",value:function(e,a){var t=[Object(I.a)().PathHelper.getDashSpace(e),a].join("/");h.a.loadUISchemaPath(t)}},{key:"toggleAside",value:function(e){var a=_.asideMenuCssClasses[0];Object(_.checkBreakpoint)("lg",_.validBreakpoints)&&(a="aside-menu-".concat("lg","-show")),F()(a,_.asideMenuCssClasses,e)}},{key:"modalToggle",value:function(){h.a.closeModal()}},{key:"render",value:function(){var e=this,a=this.props.config,t=a.TopMenus,n=a.TopRightButtons,s=a.SideMenus,l=this.props,i=l.routes,r=l.modal,c=!!this.props.processes&&this.props.processes.length>0,o=r.length>0&&r[r.length-1];return this.toggleAside(c),d.a.createElement("div",{className:"app"},d.a.createElement(P.ToastContainer,null),d.a.createElement(A,Object.assign({isOpen:r.length>0},o,{toggle:this.modalToggle})),d.a.createElement(v.d,{fixed:!0},d.a.createElement(m.Suspense,{fallback:this.loading()},d.a.createElement(G,Object.assign({navs:t,rightNavs:n,showToggle:!!this.props.processes,onConform:o&&o.onConform,onLogout:function(a){return e.signOut(a)}},this.props)))),d.a.createElement("div",{className:"app-body"},d.a.createElement(v.g,{fixed:!0,display:"lg"},d.a.createElement(v.j,null),d.a.createElement(v.i,null),d.a.createElement(m.Suspense,null,d.a.createElement(S,Object.assign({navConfig:s,loadFile:this.loadUIFile,schemaRoute:"/schemabuilder"},this.props))),d.a.createElement(v.h,null),d.a.createElement(v.k,null)),d.a.createElement("main",{className:"main"},d.a.createElement(L,{appRoutes:i}),d.a.createElement(m.Suspense,{fallback:this.loading()},d.a.createElement(p.b,Object.assign({routes:this.props.routes},this.props,{base:"/",indexRoute:"/docs/0.documents/0.index.mdx"})))),!!this.props.processes&&d.a.createElement(v.a,{fixed:!0},d.a.createElement(W,null))),d.a.createElement(v.c,null,d.a.createElement(m.Suspense,{fallback:this.loading()},d.a.createElement(q,null))))}}]),a}(m.Component);a.default=Object(U.connect)(function(e){return Object(s.a)({},e.app)})(V)}}]);
//# sourceMappingURL=3.c76cd176.chunk.js.map