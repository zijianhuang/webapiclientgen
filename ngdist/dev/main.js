(self["webpackChunkangular_io_example"] = self["webpackChunkangular_io_example"] || []).push([["main"],{

/***/ 158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard/dashboard.component */ 7528);
/* harmony import */ var _heroes_heroes_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heroes/heroes.component */ 1680);
/* harmony import */ var _hero_detail_hero_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hero-detail/hero-detail.component */ 4598);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);






const routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__.DashboardComponent },
    { path: 'detail/:id', component: _hero_detail_hero_detail_component__WEBPACK_IMPORTED_MODULE_2__.HeroDetailComponent },
    { path: 'heroes', component: _heroes_heroes_component__WEBPACK_IMPORTED_MODULE_1__.HeroesComponent }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages/messages.component */ 5298);



class AppComponent {
    constructor() {
        this.title = 'Tour of Heroes';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 9, vars: 1, consts: [["routerLink", "/dashboard"], ["routerLink", "/heroes"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "nav")(3, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Heroes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "router-outlet")(8, "app-messages");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
    } }, dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkWithHref, _messages_messages_component__WEBPACK_IMPORTED_MODULE_0__.MessagesComponent], styles: ["h1[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-decoration: none;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #e8e8e8;\n  color: #3d3d3d;\n  border-radius: 4px;\n}\nnav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: white;\n  background-color: #42545C;\n}\nnav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  background-color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNDQUFzQztBQUN0QztFQUNFLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixnQkFBZ0I7RUFDaEIscUJBQXFCO0VBQ3JCLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2Qsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxZQUFZO0VBQ1oseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSx1QkFBdUI7QUFDekIiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBBcHBDb21wb25lbnQncyBwcml2YXRlIENTUyBzdHlsZXMgKi9cbmgxIHtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cbm5hdiBhIHtcbiAgcGFkZGluZzogMXJlbTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGU4ZTg7XG4gIGNvbG9yOiAjM2QzZDNkO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG59XG5uYXYgYTpob3ZlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyNTQ1Qztcbn1cbm5hdiBhLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuIl19 */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule),
/* harmony export */   "clientFactory": () => (/* binding */ clientFactory)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-routing.module */ 158);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/dashboard.component */ 7528);
/* harmony import */ var _hero_detail_hero_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hero-detail/hero-detail.component */ 4598);
/* harmony import */ var _heroes_heroes_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./heroes/heroes.component */ 1680);
/* harmony import */ var _hero_search_hero_search_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hero-search/hero-search.component */ 3671);
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./messages/messages.component */ 5298);
/* harmony import */ var _clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../clientapi/WebApiCoreNg2ClientAuto */ 2017);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../environments/environment */ 2340);
/* harmony import */ var _ngmd_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ngmd.module */ 9597);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/platform-browser/animations */ 7146);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material-moment-adapter */ 7118);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 9121);


















function clientFactory(http) {
    if (_environments_environment__WEBPACK_IMPORTED_MODULE_8__.SiteConfigConstants.apiBaseuri) {
        console.debug('apiBaseuri:' + _environments_environment__WEBPACK_IMPORTED_MODULE_8__.SiteConfigConstants.apiBaseuri);
        return new _clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_7__.DemoWebApi_Controllers_Client.Heroes(_environments_environment__WEBPACK_IMPORTED_MODULE_8__.SiteConfigConstants.apiBaseuri, http);
    }
    //const _baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/';
    const _baseUri = 'http://localhost:5000/';
    const webApiUrl = _baseUri;
    console.debug('webApiUrl: ' + webApiUrl);
    return new _clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_7__.DemoWebApi_Controllers_Client.Heroes(webApiUrl, http);
}
//export const MY_DATE_FORMATS = {
//  parse: {
//    dateInput: 'YYYY-MM-DD',
//  },
//  display: {
//    dateInput: 'YYYY-MM-DD',
//    monthYearLabel: 'MMM YYYY',
//    dateA11yLabel: 'LL',
//    monthYearA11yLabel: 'MMMM YYYY'
//  },
//};
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_7__.DemoWebApi_Controllers_Client.Heroes,
            useFactory: clientFactory,
            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient],
        },
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_10__.LOCALE_ID, useValue: window.navigator.language },
        {
            provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.DateAdapter, useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MomentDateAdapter,
            deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MAT_DATE_LOCALE, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MAT_DATE_FORMATS, useValue: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MAT_MOMENT_DATE_FORMATS },
        { provide: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: false } },
    ], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_15__.ReactiveFormsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__.BrowserAnimationsModule,
        _ngmd_module__WEBPACK_IMPORTED_MODULE_9__.NGMDModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent,
        _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_2__.DashboardComponent,
        _heroes_heroes_component__WEBPACK_IMPORTED_MODULE_4__.HeroesComponent,
        _hero_detail_hero_detail_component__WEBPACK_IMPORTED_MODULE_3__.HeroDetailComponent,
        _messages_messages_component__WEBPACK_IMPORTED_MODULE_6__.MessagesComponent,
        _hero_search_hero_search_component__WEBPACK_IMPORTED_MODULE_5__.HeroSearchComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_15__.ReactiveFormsModule,
        _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClientModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_16__.BrowserAnimationsModule,
        _ngmd_module__WEBPACK_IMPORTED_MODULE_9__.NGMDModule] }); })();


/***/ }),

/***/ 7528:
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardComponent": () => (/* binding */ DashboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../clientapi/WebApiCoreNg2ClientAuto */ 2017);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _hero_search_hero_search_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hero-search/hero-search.component */ 3671);





function DashboardComponent_a_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const hero_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/detail/", hero_r1.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", hero_r1.name, " ");
} }
class DashboardComponent {
    constructor(heroService) {
        this.heroService = heroService;
        this.heroes = [];
    }
    ngOnInit() {
        this.heroService.getHeros().subscribe({
            next: heroes => {
                this.heroes = heroes.slice(1, 5);
            },
            error: error => console.error(error)
        });
    }
}
DashboardComponent.ɵfac = function DashboardComponent_Factory(t) { return new (t || DashboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_0__.DemoWebApi_Controllers_Client.Heroes)); };
DashboardComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: DashboardComponent, selectors: [["app-dashboard"]], decls: 5, vars: 1, consts: [[1, "heroes-menu"], [3, "routerLink", 4, "ngFor", "ngForOf"], [3, "routerLink"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Top Heroes");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, DashboardComponent_a_3_Template, 2, 2, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "app-hero-search");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.heroes);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref, _hero_search_hero_search_component__WEBPACK_IMPORTED_MODULE_1__.HeroSearchComponent], styles: ["h2[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.heroes-menu[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: auto;\n  max-width: 1000px;\n\n  \n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: space-around;\n  align-content: flex-start;\n  align-items: flex-start;\n}\n\na[_ngcontent-%COMP%] {\n  background-color: #3f525c;\n  border-radius: 2px;\n  padding: 1rem;\n  font-size: 1.2rem;\n  text-decoration: none;\n  display: inline-block;\n  color: #fff;\n  text-align: center;\n  width: 100%;\n  min-width: 70px;\n  margin: .5rem auto;\n  box-sizing: border-box;\n\n  \n  order: 0;\n  flex: 0 1 auto;\n  align-self: auto;\n}\n\n@media (min-width: 600px) {\n  a[_ngcontent-%COMP%] {\n    width: 18%;\n    box-sizing: content-box;\n  }\n}\n\na[_ngcontent-%COMP%]:hover {\n  background-color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0Qzs7QUFFNUM7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsWUFBWTtFQUNaLGlCQUFpQjs7RUFFakIsWUFBWTtFQUtaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLDZCQUE2QjtFQUM3Qix5QkFBeUI7RUFDekIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixzQkFBc0I7O0VBRXRCLFlBQVk7RUFDWixRQUFRO0VBQ1IsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtJQUNWLHVCQUF1QjtFQUN6QjtBQUNGOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCIiwiZmlsZSI6ImRhc2hib2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogRGFzaGJvYXJkQ29tcG9uZW50J3MgcHJpdmF0ZSBDU1Mgc3R5bGVzICovXG5cbmgyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uaGVyb2VzLW1lbnUge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IGF1dG87XG4gIG1heC13aWR0aDogMTAwMHB4O1xuXG4gIC8qIGZsZXhib3ggKi9cbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gIGRpc3BsYXk6IC1tb3otYm94O1xuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbn1cblxuYSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzZjUyNWM7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgcGFkZGluZzogMXJlbTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBjb2xvcjogI2ZmZjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgbWluLXdpZHRoOiA3MHB4O1xuICBtYXJnaW46IC41cmVtIGF1dG87XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgLyogZmxleGJveCAqL1xuICBvcmRlcjogMDtcbiAgZmxleDogMCAxIGF1dG87XG4gIGFsaWduLXNlbGY6IGF1dG87XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xuICBhIHtcbiAgICB3aWR0aDogMTglO1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICB9XG59XG5cbmE6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 4598:
/*!******************************************************!*\
  !*** ./src/app/hero-detail/hero-detail.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeroDetailComponent": () => (/* binding */ HeroDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../clientapi/WebApiCoreNg2ClientAuto */ 2017);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/datepicker */ 2298);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 5074);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 8562);









function HeroDetailComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "uppercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div")(5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "id: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div")(9, "label", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Hero name: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "input", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function HeroDetailComponent_div_0_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.hero.name = $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-form-field")(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Date of Birth");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "input", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function HeroDetailComponent_div_0_Template_input_ngModelChange_15_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r4.hero.dob = $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "mat-datepicker-toggle", 4)(17, "mat-datepicker", null, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function HeroDetailComponent_div_0_Template_input_ngModelChange_19_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r5.hero.death = $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeroDetailComponent_div_0_Template_button_click_24_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r6.goBack()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "go back");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeroDetailComponent_div_0_Template_button_click_26_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r7.save()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](18);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 9, ctx_r0.hero.name), " Details");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.hero.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx_r0.hero.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matDatepicker", _r1)("ngModel", ctx_r0.hero.dob);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("for", _r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx_r0.hero.death);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.hero.dob);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r0.hero.death);
} }
class HeroDetailComponent {
    constructor(heroService, route, location) {
        this.heroService = heroService;
        this.route = route;
        this.location = location;
        this.heroForm = this.CreateModelForm();
    }
    ngOnInit() {
        this.route.params.forEach((params) => {
            const id = +params['id'];
            this.heroService.getHero(id).subscribe(hero => {
                if (hero) {
                    this.hero = hero;
                    this.heroForm.patchValue(hero);
                }
            }, error => alert(error));
        });
    }
    CreateModelForm() {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup({
            id: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(undefined),
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(undefined),
            dob: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(undefined),
            death: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl(undefined),
        });
    }
    save() {
        //const raw = this.heroForm.getRawValue();
        //this.heroService.put(raw).subscribe(
        //  () => {
        //  },
        //  error => alert(error)
        //);
        this.heroService.put(this.hero).subscribe({
            next: d => {
                console.debug('response: ' + JSON.stringify(d));
            },
            error: error => alert(error)
        });
    }
    goBack() {
        this.location.back();
    }
}
HeroDetailComponent.ɵfac = function HeroDetailComponent_Factory(t) { return new (t || HeroDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_0__.DemoWebApi_Controllers_Client.Heroes), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.Location)); };
HeroDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeroDetailComponent, selectors: [["app-hero-detail"]], decls: 1, vars: 1, consts: [[4, "ngIf"], ["for", "hero-name"], ["id", "hero-name", "placeholder", "Name", 3, "ngModel", "ngModelChange"], ["matInput", "", 3, "matDatepicker", "ngModel", "ngModelChange"], ["matSuffix", "", 3, "for"], ["picker", ""], ["id", "hero-death", "type", "date", "placeholder", "Death", 3, "ngModel", "ngModelChange"], ["type", "button", 3, "click"]], template: function HeroDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, HeroDetailComponent_div_0_Template, 28, 11, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.hero);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgModel, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_5__.MatDatepicker, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_5__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_5__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_4__.UpperCasePipe], styles: ["label[_ngcontent-%COMP%] {\n  color: #435960;\n  font-weight: bold;\n}\ninput[_ngcontent-%COMP%] {\n  font-size: 1em;\n  padding: .5rem;\n}\nbutton[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  margin-right: .5rem;\n  background-color: #eee;\n  padding: 1rem;\n  border-radius: 4px;\n  font-size: 1rem;\n}\nbutton[_ngcontent-%COMP%]:hover {\n  background-color: #cfd8dc;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm8tZGV0YWlsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkNBQTZDO0FBQzdDO0VBQ0UsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsY0FBYztFQUNkLGNBQWM7QUFDaEI7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjtBQUNBO0VBQ0UseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSxzQkFBc0I7RUFDdEIsV0FBVztFQUNYLFlBQVk7QUFDZCIsImZpbGUiOiJoZXJvLWRldGFpbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogSGVyb0RldGFpbENvbXBvbmVudCdzIHByaXZhdGUgQ1NTIHN0eWxlcyAqL1xubGFiZWwge1xuICBjb2xvcjogIzQzNTk2MDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5pbnB1dCB7XG4gIGZvbnQtc2l6ZTogMWVtO1xuICBwYWRkaW5nOiAuNXJlbTtcbn1cbmJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIG1hcmdpbi1yaWdodDogLjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcbn1cbmJ1dHRvbjpkaXNhYmxlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGNvbG9yOiAjY2NjO1xuICBjdXJzb3I6IGF1dG87XG59XG4iXX0= */"] });


/***/ }),

/***/ 3671:
/*!******************************************************!*\
  !*** ./src/app/hero-search/hero-search.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeroSearchComponent": () => (/* binding */ HeroSearchComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 228);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 1989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 8977);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 2673);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../clientapi/WebApiCoreNg2ClientAuto */ 2017);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 4666);








function HeroSearchComponent_li_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li")(1, "a", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const hero_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("routerLink", "/detail/", hero_r2.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", hero_r2.name, " ");
  }
}

class HeroSearchComponent {
  constructor(heroSearchService, router) {
    this.heroSearchService = heroSearchService;
    this.router = router;
    this.searchTerms = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  } // Push a search term into the observable stream.


  search(term) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes = this.searchTerms.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(300) // wait for 300ms pause in events
    , (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.distinctUntilChanged)() // ignore if next search term is same as previous
    , (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(term => {
      if (term) {
        return this.heroSearchService.search(term);
      } else {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)([]);
      }
    }));
  }

  gotoDetail(hero) {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }

}

HeroSearchComponent.ɵfac = function HeroSearchComponent_Factory(t) {
  return new (t || HeroSearchComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_0__.DemoWebApi_Controllers_Client.Heroes), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
};

HeroSearchComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: HeroSearchComponent,
  selectors: [["app-hero-search"]],
  decls: 8,
  vars: 3,
  consts: [["id", "search-component"], ["for", "search-box"], ["id", "search-box", 3, "input"], ["searchBox", ""], [1, "search-result"], [4, "ngFor", "ngForOf"], [3, "routerLink"]],
  template: function HeroSearchComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "label", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Hero Search");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "input", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function HeroSearchComponent_Template_input_input_3_listener() {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);

        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);

        return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx.search(_r0.value));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ul", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, HeroSearchComponent_li_6_Template, 3, 2, "li", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](7, 1, ctx.heroes));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe],
  styles: ["label[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: bold;\n  font-size: 1.2rem;\n  margin-top: 1rem;\n  margin-bottom: .5rem;\n\n}\n\ninput[_ngcontent-%COMP%] {\n  padding: .5rem;\n  width: 100%;\n  max-width: 600px;\n  box-sizing: border-box;\n  display: block;\n}\n\ninput[_ngcontent-%COMP%]:focus {\n  outline: #336699 auto 1px;\n}\n\nli[_ngcontent-%COMP%] {\n  list-style-type: none;\n}\n\n.search-result[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  border-bottom: 1px solid gray;\n  border-left: 1px solid gray;\n  border-right: 1px solid gray;\n  display: inline-block;\n  width: 100%;\n  max-width: 600px;\n  padding: .5rem;\n  box-sizing: border-box;\n  text-decoration: none;\n  color: black;\n}\n\n.search-result[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background-color: #435A60;\n  color: white;\n}\n\nul.search-result[_ngcontent-%COMP%] {\n  margin-top: 0;\n  padding-left: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm8tc2VhcmNoLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsOEJBQThCOztBQUU5QjtFQUNFLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixvQkFBb0I7O0FBRXRCOztBQUNBO0VBQ0UsY0FBYztFQUNkLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBQ0E7RUFDRSw2QkFBNkI7RUFDN0IsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1QixxQkFBcUI7RUFDckIsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLHFCQUFxQjtFQUNyQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7QUFDakIiLCJmaWxlIjoiaGVyby1zZWFyY2guY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEhlcm9TZWFyY2ggcHJpdmF0ZSBzdHlsZXMgKi9cblxubGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuICBtYXJnaW4tYm90dG9tOiAuNXJlbTtcblxufVxuaW5wdXQge1xuICBwYWRkaW5nOiAuNXJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNjAwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG5pbnB1dDpmb2N1cyB7XG4gIG91dGxpbmU6ICMzMzY2OTkgYXV0byAxcHg7XG59XG5cbmxpIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xufVxuLnNlYXJjaC1yZXN1bHQgbGkgYSB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBncmF5O1xuICBib3JkZXItbGVmdDogMXB4IHNvbGlkIGdyYXk7XG4gIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIGdyYXk7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNjAwcHg7XG4gIHBhZGRpbmc6IC41cmVtO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuLnNlYXJjaC1yZXN1bHQgbGkgYTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MzVBNjA7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxudWwuc2VhcmNoLXJlc3VsdCB7XG4gIG1hcmdpbi10b3A6IDA7XG4gIHBhZGRpbmctbGVmdDogMDtcbn1cbiJdfQ== */"]
});

/***/ }),

/***/ 1680:
/*!********************************************!*\
  !*** ./src/app/heroes/heroes.component.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeroesComponent": () => (/* binding */ HeroesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../clientapi/WebApiCoreNg2ClientAuto */ 2017);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);




function HeroesComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li")(1, "a", 6)(2, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeroesComponent_li_10_Template_button_click_5_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4); const hero_r2 = restoredCtx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.delete(hero_r2)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "x");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const hero_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("routerLink", "/detail/", hero_r2.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](hero_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", hero_r2.name, " ");
} }
class HeroesComponent {
    constructor(heroService, router) {
        this.heroService = heroService;
        this.router = router;
    }
    getHeroes() {
        this.heroService.getHeros().subscribe(heroes => {
            this.heroes = heroes;
        });
    }
    add(name) {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.post(name).subscribe(hero => {
            this.heroes?.push(hero);
            this.selectedHero = undefined;
        });
    }
    delete(hero) {
        this.heroService.delete(hero.id).subscribe(() => {
            this.heroes = this.heroes?.filter(h => h !== hero);
            if (this.selectedHero === hero) {
                this.selectedHero = undefined;
            }
        });
    }
    ngOnInit() {
        this.getHeroes();
    }
    onSelect(hero) {
        this.selectedHero = hero;
    }
    gotoDetail() {
        this.router.navigate(['/detail', this.selectedHero?.id]);
    }
}
HeroesComponent.ɵfac = function HeroesComponent_Factory(t) { return new (t || HeroesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_clientapi_WebApiCoreNg2ClientAuto__WEBPACK_IMPORTED_MODULE_0__.DemoWebApi_Controllers_Client.Heroes), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
HeroesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeroesComponent, selectors: [["app-heroes"]], decls: 11, vars: 1, consts: [["for", "new-hero"], ["id", "new-hero"], ["heroName", ""], ["type", "button", 1, "add-button", 3, "click"], [1, "heroes"], [4, "ngFor", "ngForOf"], [3, "routerLink"], [1, "badge"], ["type", "button", "title", "delete hero", 1, "delete", 3, "click"]], template: function HeroesComponent_Template(rf, ctx) { if (rf & 1) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "My Heroes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div")(3, "label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Hero name: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeroesComponent_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6); ctx.add(_r0.value); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](_r0.value = ""); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Add hero ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "ul", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, HeroesComponent_li_10_Template, 7, 3, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.heroes);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkWithHref], styles: [".heroes[_ngcontent-%COMP%] {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 15em;\n}\ninput[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  padding: .5rem;\n  margin: 1rem 0;\n  box-sizing: border-box;\n}\n.heroes[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n}\n.heroes[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  left: .1em;\n}\n.heroes[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #333;\n  text-decoration: none;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n  display: block;\n  width: 100%;\n}\n.heroes[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #2c3a41;\n  background-color: #e6e6e6;\n}\n.heroes[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:active {\n  background-color: #525252;\n  color: #fafafa;\n}\n.heroes[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #405061;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  min-width: 16px;\n  text-align: right;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\n.add-button[_ngcontent-%COMP%] {\n padding: .5rem 1.5rem;\n font-size: 1rem;\n margin-bottom: 2rem;\n}\n.add-button[_ngcontent-%COMP%]:hover {\n  color: white;\n  background-color: #42545C;\n}\nbutton.delete[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 210px;\n  top: 5px;\n  background-color: white;\n  color:  #525252;\n  font-size: 1.1rem;\n  margin: 0;\n  padding: 1px 10px 3px 10px;\n}\nbutton.delete[_ngcontent-%COMP%]:hover {\n  background-color: #525252;\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlcm9lcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlDQUF5QztBQUN6QztFQUNFLGlCQUFpQjtFQUNqQixxQkFBcUI7RUFDckIsVUFBVTtFQUNWLFdBQVc7QUFDYjtBQUVBO0VBQ0UsY0FBYztFQUNkLFdBQVc7RUFDWCxjQUFjO0VBQ2QsY0FBYztFQUNkLHNCQUFzQjtBQUN4QjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7QUFFQTtFQUNFLFVBQVU7QUFDWjtBQUVBO0VBQ0UsV0FBVztFQUNYLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGVBQWU7RUFDZixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxXQUFXO0FBQ2I7QUFFQTtFQUNFLGNBQWM7RUFDZCx5QkFBeUI7QUFDM0I7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0FBQ2hCO0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWiw0QkFBNEI7RUFDNUIseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxhQUFhO0VBQ2IsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsMEJBQTBCO0FBQzVCO0FBRUE7Q0FDQyxxQkFBcUI7Q0FDckIsZUFBZTtDQUNmLG1CQUFtQjtBQUNwQjtBQUVBO0VBQ0UsWUFBWTtFQUNaLHlCQUF5QjtBQUMzQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxRQUFRO0VBQ1IsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsU0FBUztFQUNULDBCQUEwQjtBQUM1QjtBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZCIsImZpbGUiOiJoZXJvZXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEhlcm9lc0NvbXBvbmVudCdzIHByaXZhdGUgQ1NTIHN0eWxlcyAqL1xuLmhlcm9lcyB7XG4gIG1hcmdpbjogMCAwIDJlbSAwO1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAxNWVtO1xufVxuXG5pbnB1dCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogLjVyZW07XG4gIG1hcmdpbjogMXJlbSAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uaGVyb2VzIGxpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oZXJvZXMgbGk6aG92ZXIge1xuICBsZWZ0OiAuMWVtO1xufVxuXG4uaGVyb2VzIGEge1xuICBjb2xvcjogIzMzMztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUVFO1xuICBtYXJnaW46IC41ZW07XG4gIHBhZGRpbmc6IC4zZW0gMDtcbiAgaGVpZ2h0OiAxLjZlbTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5oZXJvZXMgYTpob3ZlciB7XG4gIGNvbG9yOiAjMmMzYTQxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZlNmU2O1xufVxuXG4uaGVyb2VzIGE6YWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzUyNTI1MjtcbiAgY29sb3I6ICNmYWZhZmE7XG59XG5cbi5oZXJvZXMgLmJhZGdlIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IHNtYWxsO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDAuOGVtIDAuN2VtIDAgMC43ZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MDUwNjE7XG4gIGxpbmUtaGVpZ2h0OiAxZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbGVmdDogLTFweDtcbiAgdG9wOiAtNHB4O1xuICBoZWlnaHQ6IDEuOGVtO1xuICBtaW4td2lkdGg6IDE2cHg7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBtYXJnaW4tcmlnaHQ6IC44ZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweCAwIDAgNHB4O1xufVxuXG4uYWRkLWJ1dHRvbiB7XG4gcGFkZGluZzogLjVyZW0gMS41cmVtO1xuIGZvbnQtc2l6ZTogMXJlbTtcbiBtYXJnaW4tYm90dG9tOiAycmVtO1xufVxuXG4uYWRkLWJ1dHRvbjpob3ZlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyNTQ1Qztcbn1cblxuYnV0dG9uLmRlbGV0ZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMjEwcHg7XG4gIHRvcDogNXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgY29sb3I6ICAjNTI1MjUyO1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAxcHggMTBweCAzcHggMTBweDtcbn1cblxuYnV0dG9uLmRlbGV0ZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1MjUyNTI7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ 4206:
/*!************************************!*\
  !*** ./src/app/message.service.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageService": () => (/* binding */ MessageService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);

class MessageService {
    constructor() {
        this.messages = [];
    }
    add(message) {
        this.messages.push(message);
    }
    clear() {
        this.messages = [];
    }
}
MessageService.ɵfac = function MessageService_Factory(t) { return new (t || MessageService)(); };
MessageService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MessageService, factory: MessageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5298:
/*!************************************************!*\
  !*** ./src/app/messages/messages.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessagesComponent": () => (/* binding */ MessagesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../message.service */ 4206);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 4666);



function MessagesComponent_div_0_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const message_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", message_r2, " ");
} }
function MessagesComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MessagesComponent_div_0_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r3.messageService.clear()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Clear messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, MessagesComponent_div_0_div_5_Template, 2, 1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.messageService.messages);
} }
class MessagesComponent {
    constructor(messageService) {
        this.messageService = messageService;
    }
    ngOnInit() {
    }
}
MessagesComponent.ɵfac = function MessagesComponent_Factory(t) { return new (t || MessagesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_message_service__WEBPACK_IMPORTED_MODULE_0__.MessageService)); };
MessagesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MessagesComponent, selectors: [["app-messages"]], decls: 1, vars: 1, consts: [[4, "ngIf"], ["type", "button", 1, "clear", 3, "click"], [4, "ngFor", "ngForOf"]], template: function MessagesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, MessagesComponent_div_0_Template, 6, 1, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.messageService.messages.length);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf], styles: ["h2[_ngcontent-%COMP%] {\n  color: #A80000;\n  font-family: Arial, Helvetica, sans-serif;\n  font-weight: lighter;\n}\n.clear[_ngcontent-%COMP%] {\n  color: #333;\n  background-color: #eee;\n  margin-bottom: 12px;\n  padding: 1rem;\n  border-radius: 4px;\n  font-size: 1rem;\n}\n.clear[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background-color: #42545C;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2VzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkNBQTJDO0FBQzNDO0VBQ0UsY0FBYztFQUNkLHlDQUF5QztFQUN6QyxvQkFBb0I7QUFDdEI7QUFFQTtFQUNFLFdBQVc7RUFDWCxzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjtBQUNBO0VBQ0UsV0FBVztFQUNYLHlCQUF5QjtBQUMzQiIsImZpbGUiOiJtZXNzYWdlcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogTWVzc2FnZXNDb21wb25lbnQncyBwcml2YXRlIENTUyBzdHlsZXMgKi9cbmgyIHtcbiAgY29sb3I6ICNBODAwMDA7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogbGlnaHRlcjtcbn1cblxuLmNsZWFyIHtcbiAgY29sb3I6ICMzMzM7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuLmNsZWFyOmhvdmVyIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MjU0NUM7XG59XG4iXX0= */"] });


/***/ }),

/***/ 9597:
/*!********************************!*\
  !*** ./src/app/ngmd.module.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NGMDModule": () => (/* binding */ NGMDModule)
/* harmony export */ });
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/a11y */ 4218);
/* harmony import */ var _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/accordion */ 2088);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/clipboard */ 6079);
/* harmony import */ var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/drag-drop */ 7727);
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/cdk/portal */ 7520);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/cdk/scrolling */ 6328);
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/stepper */ 1861);
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/table */ 9673);
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/tree */ 5183);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/autocomplete */ 8550);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/badge */ 3335);
/* harmony import */ var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/bottom-sheet */ 4865);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 4522);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button-toggle */ 9837);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/card */ 2156);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/checkbox */ 4792);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/chips */ 1169);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/stepper */ 4193);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/datepicker */ 2298);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/dialog */ 1484);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/divider */ 1528);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/expansion */ 7591);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/grid-list */ 2642);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/icon */ 7822);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/input */ 8562);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/list */ 6517);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/menu */ 8589);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/core */ 9121);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/paginator */ 6060);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/progress-bar */ 1294);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1708);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/radio */ 2922);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/select */ 7371);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/sidenav */ 6643);
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/slider */ 5682);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/slide-toggle */ 4714);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/snack-bar */ 930);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/sort */ 2197);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/table */ 5288);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/tabs */ 5892);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/toolbar */ 2543);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/tooltip */ 6896);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/tree */ 3453);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/cdk/overlay */ 5895);
/* harmony import */ var _angular_cdk_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/menu */ 5397);
/* harmony import */ var _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/cdk/dialog */ 2529);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2560);















































class NGMDModule {
}
NGMDModule.ɵfac = function NGMDModule_Factory(t) { return new (t || NGMDModule)(); };
NGMDModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NGMDModule });
NGMDModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.A11yModule,
        _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_2__.CdkAccordionModule,
        _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__.ClipboardModule,
        _angular_cdk_menu__WEBPACK_IMPORTED_MODULE_4__.CdkMenuModule,
        _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_5__.CdkStepperModule,
        _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__.CdkTableModule,
        _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_7__.CdkTreeModule,
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__.DragDropModule,
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__.MatAutocompleteModule,
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__.MatBadgeModule,
        _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__.MatBottomSheetModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButtonModule,
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__.MatButtonToggleModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_14__.MatCardModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__.MatCheckboxModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__.MatChipsModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__.MatStepperModule,
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__.MatDatepickerModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__.MatDialogModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__.MatDividerModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__.MatExpansionModule,
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__.MatGridListModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_24__.MatInputModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_25__.MatListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__.MatMenuModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_27__.MatNativeDateModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__.MatPaginatorModule,
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__.MatProgressBarModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__.MatProgressSpinnerModule,
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__.MatRadioModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_27__.MatRippleModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_32__.MatSelectModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__.MatSidenavModule,
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__.MatSliderModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__.MatSlideToggleModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__.MatSnackBarModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__.MatSortModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_38__.MatTableModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__.MatTabsModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__.MatToolbarModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__.MatTooltipModule,
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__.MatTreeModule,
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_43__.OverlayModule,
        _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_44__.PortalModule,
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_45__.ScrollingModule,
        _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_46__.DialogModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NGMDModule, { exports: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.A11yModule,
        _angular_cdk_accordion__WEBPACK_IMPORTED_MODULE_2__.CdkAccordionModule,
        _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_3__.ClipboardModule,
        _angular_cdk_menu__WEBPACK_IMPORTED_MODULE_4__.CdkMenuModule,
        _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_5__.CdkStepperModule,
        _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__.CdkTableModule,
        _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_7__.CdkTreeModule,
        _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_8__.DragDropModule,
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_9__.MatAutocompleteModule,
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_10__.MatBadgeModule,
        _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_11__.MatBottomSheetModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButtonModule,
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_13__.MatButtonToggleModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_14__.MatCardModule,
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_15__.MatCheckboxModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_16__.MatChipsModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_17__.MatStepperModule,
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_18__.MatDatepickerModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_19__.MatDialogModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__.MatDividerModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_21__.MatExpansionModule,
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_22__.MatGridListModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_24__.MatInputModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_25__.MatListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_26__.MatMenuModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_27__.MatNativeDateModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_28__.MatPaginatorModule,
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_29__.MatProgressBarModule,
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_30__.MatProgressSpinnerModule,
        _angular_material_radio__WEBPACK_IMPORTED_MODULE_31__.MatRadioModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_27__.MatRippleModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_32__.MatSelectModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_33__.MatSidenavModule,
        _angular_material_slider__WEBPACK_IMPORTED_MODULE_34__.MatSliderModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_35__.MatSlideToggleModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_36__.MatSnackBarModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_37__.MatSortModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_38__.MatTableModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_39__.MatTabsModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_40__.MatToolbarModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_41__.MatTooltipModule,
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_42__.MatTreeModule,
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_43__.OverlayModule,
        _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_44__.PortalModule,
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_45__.ScrollingModule,
        _angular_cdk_dialog__WEBPACK_IMPORTED_MODULE_46__.DialogModule] }); })();


/***/ }),

/***/ 2017:
/*!**************************************************!*\
  !*** ./src/clientapi/WebApiCoreNg2ClientAuto.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DemoCoreWeb_Controllers_Client": () => (/* binding */ DemoCoreWeb_Controllers_Client),
/* harmony export */   "DemoWebApi_Controllers_Client": () => (/* binding */ DemoWebApi_Controllers_Client),
/* harmony export */   "DemoWebApi_DemoData_Client": () => (/* binding */ DemoWebApi_DemoData_Client)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 8987);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2560);




var DemoWebApi_DemoData_Client;

(function (DemoWebApi_DemoData_Client) {
  let AddressType;

  (function (AddressType) {
    AddressType[AddressType["Postal"] = 0] = "Postal";
    AddressType[AddressType["Residential"] = 1] = "Residential";
  })(AddressType = DemoWebApi_DemoData_Client.AddressType || (DemoWebApi_DemoData_Client.AddressType = {}));

  let Days;

  (function (Days) {
    Days[Days["Sat"] = 1] = "Sat";
    Days[Days["Sun"] = 2] = "Sun";
    Days[Days["Mon"] = 3] = "Mon";
    Days[Days["Tue"] = 4] = "Tue";
    Days[Days["Wed"] = 5] = "Wed";
    /**
     * Thursday
     */

    Days[Days["Thu"] = 6] = "Thu";
    Days[Days["Fri"] = 7] = "Fri";
  })(Days = DemoWebApi_DemoData_Client.Days || (DemoWebApi_DemoData_Client.Days = {}));

  let MedicalContraindiationResponseTypeReason;

  (function (MedicalContraindiationResponseTypeReason) {
    MedicalContraindiationResponseTypeReason["M"] = "Mm";
    MedicalContraindiationResponseTypeReason["S"] = "Ss";
    MedicalContraindiationResponseTypeReason["P"] = "Pp";
    MedicalContraindiationResponseTypeReason["I"] = "I";
    MedicalContraindiationResponseTypeReason["A"] = "A";
  })(MedicalContraindiationResponseTypeReason = DemoWebApi_DemoData_Client.MedicalContraindiationResponseTypeReason || (DemoWebApi_DemoData_Client.MedicalContraindiationResponseTypeReason = {}));

  let MedicalContraindiationResponseTypeTypeCode;

  (function (MedicalContraindiationResponseTypeTypeCode) {
    MedicalContraindiationResponseTypeTypeCode["P"] = "P";
    MedicalContraindiationResponseTypeTypeCode["T"] = "Tt";
  })(MedicalContraindiationResponseTypeTypeCode = DemoWebApi_DemoData_Client.MedicalContraindiationResponseTypeTypeCode || (DemoWebApi_DemoData_Client.MedicalContraindiationResponseTypeTypeCode = {}));

  let MyEnumType;

  (function (MyEnumType) {
    MyEnumType[MyEnumType["First"] = 1] = "First";
    MyEnumType[MyEnumType["Two"] = 2] = "Two";
  })(MyEnumType = DemoWebApi_DemoData_Client.MyEnumType || (DemoWebApi_DemoData_Client.MyEnumType = {}));
  /**
   * Phone type
   * Tel, Mobile, Skyp and Fax
   */


  let PhoneType;

  (function (PhoneType) {
    /**
     * Land line
     */
    PhoneType[PhoneType["Tel"] = 0] = "Tel";
    /**
     * Mobile phone
     */

    PhoneType[PhoneType["Mobile"] = 1] = "Mobile";
    PhoneType[PhoneType["Skype"] = 2] = "Skype";
    PhoneType[PhoneType["Fax"] = 3] = "Fax";
  })(PhoneType = DemoWebApi_DemoData_Client.PhoneType || (DemoWebApi_DemoData_Client.PhoneType = {}));
})(DemoWebApi_DemoData_Client || (DemoWebApi_DemoData_Client = {}));

var DemoCoreWeb_Controllers_Client;

(function (DemoCoreWeb_Controllers_Client) {
  class SpecialTypes {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * Anonymous Dynamic of C#
     * GET api/SpecialTypes/AnonymousDynamic
     * @return {any} dyanmic things
     */


    getAnonymousDynamic(headersHandler) {
      return this.http.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * Async function returing dynamic
     * GET api/SpecialTypes/AnonymousDynamic2
     */


    getAnonymousDynamic2(headersHandler) {
      return this.http.get(this.baseUri + 'api/SpecialTypes/AnonymousDynamic2', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * GET api/SpecialTypes/AnonymousObject
     */


    getAnonymousObject(headersHandler) {
      return this.http.get(this.baseUri + 'api/SpecialTypes/AnonymousObject', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * Async function returning object
     * GET api/SpecialTypes/AnonymousObject2
     */


    getAnonymousObject2(headersHandler) {
      return this.http.get(this.baseUri + 'api/SpecialTypes/AnonymousObject2', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * POST api/SpecialTypes/AnonymousObject
     */


    postAnonymousObject(obj, headersHandler) {
      return this.http.post(this.baseUri + 'api/SpecialTypes/AnonymousObject', JSON.stringify(obj), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * Async returning object, Post dynamic
     * POST api/SpecialTypes/AnonymousObject2
     */


    postAnonymousObject2(obj, headersHandler) {
      return this.http.post(this.baseUri + 'api/SpecialTypes/AnonymousObject2', JSON.stringify(obj), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        observe: 'response',
        responseType: 'text'
      });
    }

  }

  SpecialTypes.ɵfac = function SpecialTypes_Factory(t) {
    return new (t || SpecialTypes)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  SpecialTypes.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: SpecialTypes,
    factory: SpecialTypes.ɵfac
  });
  DemoCoreWeb_Controllers_Client.SpecialTypes = SpecialTypes;
})(DemoCoreWeb_Controllers_Client || (DemoCoreWeb_Controllers_Client = {}));

var DemoWebApi_Controllers_Client;

(function (DemoWebApi_Controllers_Client) {
  class DateTypes {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * GET api/DateTypes/GetDateOnlyMin
     */


    getDateOnlyMin(headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/GetDateOnlyMin', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/DateTypes/NullableDatetime/{hasValue}
     */


    getDateTime(hasValue, headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/NullableDatetime/' + hasValue, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * return DateTimeOffset.Now
     * GET api/DateTypes/ForDateTimeOffset
     */


    getDateTimeOffset(headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/ForDateTimeOffset', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/DateTypes/NextHour/{dt}
     */


    getNextHour(dt, headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/NextHour/' + dt?.toISOString(), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * If Dt is not defined, add a hour from now
     * GET api/DateTypes/NextHourNullable?n={n}&dt={dt}
     */


    getNextHourNullable(n, dt, headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/NextHourNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/DateTypes/NextYear/{dt}
     */


    getNextYear(dt, headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/NextYear/' + dt?.toISOString(), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * If Dt is not defined, add a year from now
     * GET api/DateTypes/NextYearNullable?n={n}&dt={dt}
     */


    getNextYearNullable(n, dt, headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/NextYearNullable?n=' + n + (dt ? '&dt=' + dt?.toISOString() : ''), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Client should send DateTime.Date
     * POST api/DateTypes/IsDateTimeDate
     */


    isDateTimeDate(dt, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/IsDateTimeDate', JSON.stringify(dt), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/DateTypes/IsDateTimeOffsetDate
     */


    isDateTimeOffsetDate(dt, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/IsDateTimeOffsetDate', JSON.stringify(dt), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/DateTypes/ForDateOnly
     */


    postDateOnly(d, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/ForDateOnly', JSON.stringify(d), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/DateTypes/DateOnlyNullable
     */


    postDateOnlyNullable(d, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/DateOnlyNullable', JSON.stringify(d), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/DateTypes/ForDateTime
     */


    postDateTime(d, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/ForDateTime', JSON.stringify(d), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * return d;
     * POST api/DateTypes/ForDateTimeOffset
     */


    postDateTimeOffset(d, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/ForDateTimeOffset', JSON.stringify(d), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * return d.ToString("O")
     * POST api/DateTypes/ForDateTimeOffsetForO
     */


    postDateTimeOffsetForO(d, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForO', JSON.stringify(d), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * POST api/DateTypes/ForDateTimeOffsetForOffset
     */


    postDateTimeOffsetForOffset(d, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetForOffset', JSON.stringify(d), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * Returned is DateTimeOffset?
     * POST api/DateTypes/DateTimeOffsetNullable
     */


    postDateTimeOffsetNullable(d, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/DateTimeOffsetNullable', JSON.stringify(d), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/DateTypes/ForDateTimeOffsetStringForOffset
     */


    postDateTimeOffsetStringForOffset(s, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/ForDateTimeOffsetStringForOffset', JSON.stringify(s), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * POST api/DateTypes/NextYear
     */


    postNextYear(dt, headersHandler) {
      return this.http.post(this.baseUri + 'api/DateTypes/NextYear', JSON.stringify(dt), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * GET api/DateTypes/DateOnlyStringQuery?d={d}
     */


    queryDateOnlyAsString(d, headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/DateOnlyStringQuery?d=' + (!d ? '' : encodeURIComponent(d)), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/DateTypes/RouteDateTimeOffset/{d}
     */


    routeDateTimeOffset(d, headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/RouteDateTimeOffset/' + d?.toISOString(), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Return Tuple DateTime?, DateTime?
     * GET api/DateTypes/SearchDateRange?startDate={startDate}&endDate={endDate}
     * @param {Date | null} startDate DateTime? startDate = null
     * @param {Date | null} endDate DateTime? endDate = null
     */


    searchDateRange(startDate, endDate, headersHandler) {
      return this.http.get(this.baseUri + 'api/DateTypes/SearchDateRange?' + (startDate ? 'startDate=' + startDate?.toISOString() : '') + (endDate ? '&endDate=' + endDate?.toISOString() : ''), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }

  }

  DateTypes.ɵfac = function DateTypes_Factory(t) {
    return new (t || DateTypes)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  DateTypes.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: DateTypes,
    factory: DateTypes.ɵfac
  });
  DemoWebApi_Controllers_Client.DateTypes = DateTypes;

  class Entities {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * POST api/Entities/createCompany
     */


    createCompany(p, headersHandler) {
      return this.http.post(this.baseUri + 'api/Entities/createCompany', JSON.stringify(p), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Entities/createPerson
     */


    createPerson(p, headersHandler) {
      return this.http.post(this.baseUri + 'api/Entities/createPerson', JSON.stringify(p), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Entities/createPerson2
     */


    createPerson2(p, headersHandler) {
      return this.http.post(this.baseUri + 'api/Entities/createPerson2', JSON.stringify(p), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Entities/createPerson3
     */


    createPerson3(p, headersHandler) {
      return this.http.post(this.baseUri + 'api/Entities/createPerson3', JSON.stringify(p), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * DELETE api/Entities/{id}
     */


    delete(id, headersHandler) {
      return this.http.delete(this.baseUri + 'api/Entities/' + id, {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * GET api/Entities/Company/{id}
     */


    getCompany(id, headersHandler) {
      return this.http.get(this.baseUri + 'api/Entities/Company/' + id, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * POST api/Entities/Mims
     */


    getMims(p, headersHandler) {
      return this.http.post(this.baseUri + 'api/Entities/Mims', JSON.stringify(p), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post MyGeneric string, decimal, double
     * POST api/Entities/MyGeneric
     */


    getMyGeneric(s, headersHandler) {
      return this.http.post(this.baseUri + 'api/Entities/MyGeneric', JSON.stringify(s), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post MyGeneric string, decimal, Person
     * POST api/Entities/MyGenericPerson
     */


    getMyGenericPerson(s, headersHandler) {
      return this.http.post(this.baseUri + 'api/Entities/MyGenericPerson', JSON.stringify(s), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Return empty body, status 204. MaybeNull
     * GET api/Entities/NullCompany
     */


    getNullCompany(headersHandler) {
      return this.http.get(this.baseUri + 'api/Entities/NullCompany', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Get a person
     * so to know the person
     * GET api/Entities/getPerson/{id}
     * @param {number} id unique id of that guy
     * @return {DemoWebApi_DemoData_Client.Person} person in db
     */


    getPerson(id, headersHandler) {
      return this.http.get(this.baseUri + 'api/Entities/getPerson/' + id, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/Entities/getPerson2/{id}
     */


    getPerson2(id, headersHandler) {
      return this.http.get(this.baseUri + 'api/Entities/getPerson2/' + id, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * PUT api/Entities/link?id={id}&relationship={relationship}
     */


    linkPerson(id, relationship, person, headersHandler) {
      return this.http.put(this.baseUri + 'api/Entities/link?id=' + id + '&relationship=' + (!relationship ? '' : encodeURIComponent(relationship)), JSON.stringify(person), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * PATCH api/Entities/patchPerson
     */


    patchPerson(person, headersHandler) {
      return this.http.patch(this.baseUri + 'api/Entities/patchPerson', JSON.stringify(person), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * POST api/Entities/IdMap
     */


    postIdMap(idMap, headersHandler) {
      return this.http.post(this.baseUri + 'api/Entities/IdMap', JSON.stringify(idMap), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * PUT api/Entities/updatePerson
     */


    updatePerson(person, headersHandler) {
      return this.http.put(this.baseUri + 'api/Entities/updatePerson', JSON.stringify(person), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }

  }

  Entities.ɵfac = function Entities_Factory(t) {
    return new (t || Entities)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  Entities.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: Entities,
    factory: Entities.ɵfac
  });
  DemoWebApi_Controllers_Client.Entities = Entities;

  class Heroes {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * DELETE api/Heroes/{id}
     */


    delete(id, headersHandler) {
      return this.http.delete(this.baseUri + 'api/Heroes/' + id, {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * GET api/Heroes/asyncHeroes
     */


    getAsyncHeroes(headersHandler) {
      return this.http.get(this.baseUri + 'api/Heroes/asyncHeroes', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Get a hero. Nullable reference. MaybeNull
     * GET api/Heroes/{id}
     */


    getHero(id, headersHandler) {
      return this.http.get(this.baseUri + 'api/Heroes/' + id, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Get all heroes.
     * GET api/Heroes
     */


    getHeros(headersHandler) {
      return this.http.get(this.baseUri + 'api/Heroes', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * MaybeNull
     * GET api/Heroes/super?id={id}
     */


    getSuperHero(id, headersHandler) {
      return this.http.get(this.baseUri + 'api/Heroes/super?id=' + id, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * POST api/Heroes
     */


    post(name, headersHandler) {
      return this.http.post(this.baseUri + 'api/Heroes', JSON.stringify(name), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Add a hero. The client will not expect null. NotNull
     * POST api/Heroes/q?name={name}
     * @return {DemoWebApi_Controllers_Client.Hero} Always object.
     */


    postWithQuery(name, headersHandler) {
      return this.http.post(this.baseUri + 'api/Heroes/q?name=' + (!name ? '' : encodeURIComponent(name)), null, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Update hero.
     * PUT api/Heroes
     */


    put(hero, headersHandler) {
      return this.http.put(this.baseUri + 'api/Heroes', JSON.stringify(hero), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Search heroes
     * GET api/Heroes/search/{name}
     * @param {string} name keyword contained in hero name.
     * @return {Array<DemoWebApi_Controllers_Client.Hero>} Hero array matching the keyword.
     */


    search(name, headersHandler) {
      return this.http.get(this.baseUri + 'api/Heroes/search/' + (!name ? '' : encodeURIComponent(name)), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }

  }

  Heroes.ɵfac = function Heroes_Factory(t) {
    return new (t || Heroes)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  Heroes.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: Heroes,
    factory: Heroes.ɵfac
  });
  DemoWebApi_Controllers_Client.Heroes = Heroes;

  class StringData {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * Athlethe Search
     * GET api/StringData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
     * @param {number | null} take Generic optional parameter. Default 10
     * @param {number} skip Default 0
     * @param {string} order default null
     */


    athletheSearch(take, skip, order, sort, search, headersHandler) {
      return this.http.get(this.baseUri + 'api/StringData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * GET api/StringData/String
     */


    getABCDE(headersHandler) {
      return this.http.get(this.baseUri + 'api/StringData/String', {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * Return empty string JSON object. Status 200.
     * GET api/StringData/EmptyString
     */


    getEmptyString(headersHandler) {
      return this.http.get(this.baseUri + 'api/StringData/EmptyString', {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * Return empty body with status 204 No Content, even though the default mime type is application/json. MaybeNull
     * GET api/StringData/NullString
     */


    getNullString(headersHandler) {
      return this.http.get(this.baseUri + 'api/StringData/NullString', {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }

  }

  StringData.ɵfac = function StringData_Factory(t) {
    return new (t || StringData)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  StringData.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: StringData,
    factory: StringData.ɵfac
  });
  DemoWebApi_Controllers_Client.StringData = StringData;

  class SuperDemo {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * GET api/SuperDemo/ActionResult
     */


    getActionResult(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/ActionResult', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * GET api/SuperDemo/ActionResult2
     */


    getActionResult2(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/ActionResult2', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * GET api/SuperDemo/ActionStringResult
     */


    getActionStringResult(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/ActionStringResult', {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * GET api/SuperDemo/BadRequest
     */


    getBadRequest(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/BadRequest', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'blob'
      });
    }
    /**
     * GET api/SuperDemo/BadRequest2
     */


    getBadRequest2(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/BadRequest2', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * GET api/SuperDemo/bool
     */


    getBool(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/bool', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/byte
     */


    getbyte(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/byte', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/ByteArray
     */


    getByteArray(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/ByteArray', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/char
     */


    getChar(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/char', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/Collection
     */


    getCollection(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/Collection', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/enumGet?d={d}
     */


    getDay(d, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/enumGet?d=' + d, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/decimal
     */


    getDecimal(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/decimal', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Demo
     * GET api/SuperDemo/decimalArrayQ?a={a}
     */


    getDecimalArrayQ(a, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/decimalArrayQ?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/decimal/{d}
     */


    getDecimalSquare(d, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/decimal/' + d, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/DecimalZero
     */


    getDecimalZero(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/DecimalZero', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/StringStringDic
     */


    getDictionary(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/StringStringDic', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/StringPersonDic
     */


    getDictionaryOfPeople(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/StringPersonDic', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/StringPersonDic2
     */


    getDictionaryOfPeople2(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/StringPersonDic2', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/doulbe
     */


    getdouble(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/doulbe', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Result of 0.1d + 0.2d - 0.3d
     * GET api/SuperDemo/DoubleZero
     */


    getDoubleZero(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/DoubleZero', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Demo IEnumerable Days
     * GET api/SuperDemo/enumArrayDays?a={a}
     */


    getEnumArrayDays(a, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/enumArrayDays?' + a?.map(z => `a=${z}`).join('&'), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/enumArrayQ2?a={a}
     */


    getEnumArrayQ2(a, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/enumArrayQ2?' + a?.map(z => `a=${z}`).join('&'), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/FloatZero
     */


    getFloatZero(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/FloatZero', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/ICollection
     */


    getICollection(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/ICollection', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/IList
     */


    getIList(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/IList', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/int2d
     */


    getInt2D(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/int2d', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/int2dJagged
     */


    getInt2DJagged(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/int2dJagged', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/intArray
     */


    getIntArray(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/intArray', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Demo int[];
     * GET api/SuperDemo/intArrayQ?a={a}
     */


    getIntArrayQ(a, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/intArrayQ?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Demo IEnumerable long
     * GET api/SuperDemo/intArrayQ2?a={a}
     */


    getIntArrayQ2(a, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/intArrayQ2?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/int/{d}
     */


    getIntSquare(d, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/int/' + d, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/IReadOnlyCollection
     */


    getIReadOnlyCollection(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/IReadOnlyList
     */


    getIReadOnlyList(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/IReadOnlyList', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/KeyValuePair
     */


    getKeyhValuePair(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/KeyValuePair', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/List
     */


    getList(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/List', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/NullableDecimal/{hasValue}
     */


    getNullableDecimal(hasValue, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/NullableDecimal/' + hasValue, {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * MaybeNull
     * GET api/SuperDemo/NullObject
     */


    getNullPerson(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/NullObject', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/DoubleNullable?location={location}&dd={dd}&de={de}
     */


    getPrimitiveNullable(location, dd, de, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/DoubleNullable?location=' + (!location ? '' : encodeURIComponent(location)) + (dd ? '&dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/DoubleNullable2?dd={dd}&de={de}
     */


    getPrimitiveNullable2(dd, de, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/DoubleNullable2?' + (dd ? 'dd=' + dd.toString() : '') + (de ? '&de=' + de.toString() : ''), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/sbyte
     */


    getsbyte(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/sbyte', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/short
     */


    getShort(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/short', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Demo string array
     * GET api/SuperDemo/stringArrayQ?a={a}
     */


    getStringArrayQ(a, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/stringArrayQ?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Demo List string
     * GET api/SuperDemo/stringArrayQ2?a={a}
     */


    getStringArrayQ2(a, headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/stringArrayQ2?' + a?.map(z => `a=${encodeURIComponent(z)}`).join('&'), {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * ActionResult with FileStreamResult
     * GET api/SuperDemo/TextStream
     */


    getTextStream(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/TextStream', {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'blob'
      });
    }
    /**
     * GET api/SuperDemo/uint
     */


    getUint(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/uint', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/ulong
     */


    getulong(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/ulong', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/SuperDemo/ushort
     */


    getUShort(headersHandler) {
      return this.http.get(this.baseUri + 'api/SuperDemo/ushort', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * POST api/SuperDemo/ActionResult
     */


    postActionResult(headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/ActionResult', null, {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * POST api/SuperDemo/PostActionResult2
     */


    postActionResult2(s, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/PostActionResult2', JSON.stringify(s), {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'blob'
      });
    }
    /**
     * POST api/SuperDemo/PostActionResult3
     */


    postActionResult3(person, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/PostActionResult3', JSON.stringify(person), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * Post a collection of person
     * POST api/SuperDemo/Collection
     */


    postCollection(list, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/Collection', JSON.stringify(list), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/SuperDemo/enumPost?d={d}
     */


    postDay(d, d2, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/enumPost?d=' + d, JSON.stringify(d2), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Demo Dic string and person
     * POST api/SuperDemo/StringPersonDic
     */


    postDictionary(dic, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/StringPersonDic', JSON.stringify(dic), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/SuperDemo/Guids
     */


    postGuids(guids, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/Guids', JSON.stringify(guids), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post ICollection of person
     * POST api/SuperDemo/ICollection
     */


    postICollection(list, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/ICollection', JSON.stringify(list), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post IList of person
     * POST api/SuperDemo/IList
     */


    postIList(list, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/IList', JSON.stringify(list), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/SuperDemo/int2d
     */


    postInt2D(a, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/int2d', JSON.stringify(a), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Demo int[][]
     * POST api/SuperDemo/int2djagged
     */


    postInt2DJagged(a, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/int2djagged', JSON.stringify(a), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Demo int[]
     * POST api/SuperDemo/intArray
     */


    postIntArray(a, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/intArray', JSON.stringify(a), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post IReadOnlyCollection of person
     * POST api/SuperDemo/IReadOnlyCollection
     */


    postIReadOnlyCollection(list, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/IReadOnlyCollection', JSON.stringify(list), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post e of person
     * POST api/SuperDemo/IReadOnlyList
     */


    postIReadOnlyList(list, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/IReadOnlyList', JSON.stringify(list), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post a list of person
     * POST api/SuperDemo/List
     */


    postList(list, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/List', JSON.stringify(list), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/SuperDemo/PostEmpty/{i}
     */


    postWithQueryButEmptyBody(s, i, headersHandler) {
      return this.http.post(this.baseUri + 'api/SuperDemo/PostEmpty/' + i, JSON.stringify(s), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }

  }

  SuperDemo.ɵfac = function SuperDemo_Factory(t) {
    return new (t || SuperDemo)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  SuperDemo.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: SuperDemo,
    factory: SuperDemo.ɵfac
  });
  DemoWebApi_Controllers_Client.SuperDemo = SuperDemo;

  class TextData {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * GET api/TextData/AthletheSearch?take={take}&skip={skip}&order={order}&sort={sort}&search={search}
     */


    athletheSearch(take, skip, order, sort, search, headersHandler) {
      return this.http.get(this.baseUri + 'api/TextData/AthletheSearch?' + (take ? 'take=' + take.toString() : '') + '&skip=' + skip + '&order=' + (!order ? '' : encodeURIComponent(order)) + '&sort=' + (!sort ? '' : encodeURIComponent(sort)) + '&search=' + (!search ? '' : encodeURIComponent(search)), {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * GET api/TextData/String
     */


    getABCDE(headersHandler) {
      return this.http.get(this.baseUri + 'api/TextData/String', {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * Return empty body with status 200.
     * GET api/TextData/EmptyString
     */


    getEmptyString(headersHandler) {
      return this.http.get(this.baseUri + 'api/TextData/EmptyString', {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * MaybeNull
     * GET api/TextData/NullableString
     */


    getNullableString(headersHandler) {
      return this.http.get(this.baseUri + 'api/TextData/NullableString', {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * Return empty body with status 204 No Content.
     * GET api/TextData/NullString
     */


    getNullString(headersHandler) {
      return this.http.get(this.baseUri + 'api/TextData/NullString', {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }

  }

  TextData.ɵfac = function TextData_Factory(t) {
    return new (t || TextData)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  TextData.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TextData,
    factory: TextData.ɵfac
  });
  DemoWebApi_Controllers_Client.TextData = TextData;

  class Tuple {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * Update in a transaction
     * PUT api/Tuple/A1TupleArray
     */


    a1TupleArray(idAndOrderArray, headersHandler) {
      return this.http.put(this.baseUri + 'api/Tuple/A1TupleArray', JSON.stringify(idAndOrderArray), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * Update IEnumerable Tuple in a transaction
     * PUT api/Tuple/A1TupleArray
     */


    a2TupleIEnumerable(idAndOrderArray, headersHandler) {
      return this.http.put(this.baseUri + 'api/Tuple/A1TupleArray', JSON.stringify(idAndOrderArray), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * Post tuple
     * POST api/Tuple/ChangeName
     */


    changeName(d, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/ChangeName', JSON.stringify(d), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Get Tuple in return. MaybeNull
     * GET api/Tuple/PeopleCompany4
     */


    getPeopleCompany4(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/PeopleCompany4', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * MaybeNull
     * GET api/Tuple/PeopleCompany5
     */


    getPeopleCompany5(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/PeopleCompany5', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/Tuple/Tuple1
     */


    getTuple1(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/Tuple1', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/Tuple/Tuple2
     */


    getTuple2(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/Tuple2', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/Tuple/Tuple3
     */


    getTuple3(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/Tuple3', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/Tuple/Tuple4
     */


    getTuple4(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/Tuple4', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/Tuple/Tuple5
     */


    getTuple5(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/Tuple5', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/Tuple/Tuple6
     */


    getTuple6(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/Tuple6', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * GET api/Tuple/Tuple7
     */


    getTuple7(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/Tuple7', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Post nested tuple
     * GET api/Tuple/Tuple8
     */


    getTuple8(headersHandler) {
      return this.http.get(this.baseUri + 'api/Tuple/Tuple8', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * POST api/Tuple/PeopleCompany2
     */


    linkPeopleCompany2(peopleAndCompany, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany2', JSON.stringify(peopleAndCompany), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Tuple/PeopleCompany3
     */


    linkPeopleCompany3(peopleAndCompany, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany3', JSON.stringify(peopleAndCompany), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Tuple/PeopleCompany4
     */


    linkPeopleCompany4(peopleAndCompany, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany4', JSON.stringify(peopleAndCompany), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Tuple/PeopleCompany5
     */


    linkPeopleCompany5(peopleAndCompany, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany5', JSON.stringify(peopleAndCompany), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Tuple/PeopleCompany6
     */


    linkPeopleCompany6(peopleAndCompany, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany6', JSON.stringify(peopleAndCompany), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post long tuple
     * POST api/Tuple/PeopleCompany7
     */


    linkPeopleCompany7(peopleAndCompany, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany7', JSON.stringify(peopleAndCompany), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Tuple/PeopleCompany8
     */


    linkPeopleCompany8(peopleAndCompany, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/PeopleCompany8', JSON.stringify(peopleAndCompany), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Tuple/PersonCompany1
     */


    linkPersonCompany1(peopleAndCompany, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/PersonCompany1', JSON.stringify(peopleAndCompany), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * POST api/Tuple/Tuple1
     */


    postTuple1(tuple, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/Tuple1', JSON.stringify(tuple), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        })
      });
    }
    /**
     * Post tuple string int
     * POST api/Tuple/Tuple2
     */


    postTuple2(tuple, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/Tuple2', JSON.stringify(tuple), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * POST api/Tuple/Tuple3
     */


    postTuple3(tuple, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/Tuple3', JSON.stringify(tuple), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * POST api/Tuple/Tuple4
     */


    postTuple4(tuple, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/Tuple4', JSON.stringify(tuple), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * POST api/Tuple/Tuple5
     */


    postTuple5(tuple, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/Tuple5', JSON.stringify(tuple), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * POST api/Tuple/Tuple6
     */


    postTuple6(tuple, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/Tuple6', JSON.stringify(tuple), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * POST api/Tuple/Tuple7
     */


    postTuple7(tuple, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/Tuple7', JSON.stringify(tuple), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * POST api/Tuple/Tuple8
     */


    postTuple8(tuple, headersHandler) {
      return this.http.post(this.baseUri + 'api/Tuple/Tuple8', JSON.stringify(tuple), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }

  }

  Tuple.ɵfac = function Tuple_Factory(t) {
    return new (t || Tuple)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  Tuple.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: Tuple,
    factory: Tuple.ɵfac
  });
  DemoWebApi_Controllers_Client.Tuple = Tuple;

  class Values {
    constructor(baseUri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', http) {
      this.baseUri = baseUri;
      this.http = http;
    }
    /**
     * DELETE api/Values/{id}
     */


    delete(id, headersHandler) {
      return this.http.delete(this.baseUri + 'api/Values/' + id, {
        headers: headersHandler ? headersHandler() : undefined,
        observe: 'response',
        responseType: 'text'
      });
    }
    /**
     * Get a list of value
     * GET api/Values
     */


    get(headersHandler) {
      return this.http.get(this.baseUri + 'api/Values', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * Get by both Id and name
     * GET api/Values/{id}?name={name}
     */


    getByIdAndName(id, name, headersHandler) {
      return this.http.get(this.baseUri + 'api/Values/' + id + '?name=' + (!name ? '' : encodeURIComponent(name)), {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * GET api/Values?name={name}
     */


    getByName(name, headersHandler) {
      return this.http.get(this.baseUri + 'api/Values?name=' + (!name ? '' : encodeURIComponent(name)), {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * GET api/Values/{id}
     */


    getById(id, headersHandler) {
      return this.http.get(this.baseUri + 'api/Values/' + id, {
        headers: headersHandler ? headersHandler() : undefined,
        responseType: 'text'
      });
    }
    /**
     * GET api/Values/Get2
     */


    get2(headersHandler) {
      return this.http.get(this.baseUri + 'api/Values/Get2', {
        headers: headersHandler ? headersHandler() : undefined
      });
    }
    /**
     * POST api/Values
     */


    post(value, headersHandler) {
      return this.http.post(this.baseUri + 'api/Values', JSON.stringify(value), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        responseType: 'text'
      });
    }
    /**
     * Update with valjue
     * PUT api/Values/{id}
     */


    put(id, value, headersHandler) {
      return this.http.put(this.baseUri + 'api/Values/' + id, JSON.stringify(value), {
        headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8'
        }),
        observe: 'response',
        responseType: 'text'
      });
    }

  }

  Values.ɵfac = function Values_Factory(t) {
    return new (t || Values)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"]('baseUri'), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpClient));
  };

  Values.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: Values,
    factory: Values.ɵfac
  });
  DemoWebApi_Controllers_Client.Values = Values;
})(DemoWebApi_Controllers_Client || (DemoWebApi_Controllers_Client = {}));

/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SiteConfigConstants": () => (/* binding */ SiteConfigConstants),
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
const SiteConfigConstants = {
    ...(typeof SITE_CONFIG === 'undefined' ? {} : SITE_CONFIG),
};


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 4497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ }),

/***/ 6700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 8685,
	"./af.js": 8685,
	"./ar": 254,
	"./ar-dz": 4312,
	"./ar-dz.js": 4312,
	"./ar-kw": 2614,
	"./ar-kw.js": 2614,
	"./ar-ly": 8630,
	"./ar-ly.js": 8630,
	"./ar-ma": 8674,
	"./ar-ma.js": 8674,
	"./ar-sa": 9032,
	"./ar-sa.js": 9032,
	"./ar-tn": 4730,
	"./ar-tn.js": 4730,
	"./ar.js": 254,
	"./az": 3052,
	"./az.js": 3052,
	"./be": 150,
	"./be.js": 150,
	"./bg": 3069,
	"./bg.js": 3069,
	"./bm": 3466,
	"./bm.js": 3466,
	"./bn": 8516,
	"./bn-bd": 557,
	"./bn-bd.js": 557,
	"./bn.js": 8516,
	"./bo": 6273,
	"./bo.js": 6273,
	"./br": 9588,
	"./br.js": 9588,
	"./bs": 9815,
	"./bs.js": 9815,
	"./ca": 3331,
	"./ca.js": 3331,
	"./cs": 1320,
	"./cs.js": 1320,
	"./cv": 2219,
	"./cv.js": 2219,
	"./cy": 8266,
	"./cy.js": 8266,
	"./da": 6427,
	"./da.js": 6427,
	"./de": 7435,
	"./de-at": 2871,
	"./de-at.js": 2871,
	"./de-ch": 2994,
	"./de-ch.js": 2994,
	"./de.js": 7435,
	"./dv": 2357,
	"./dv.js": 2357,
	"./el": 5649,
	"./el.js": 5649,
	"./en-au": 9961,
	"./en-au.js": 9961,
	"./en-ca": 9878,
	"./en-ca.js": 9878,
	"./en-gb": 3924,
	"./en-gb.js": 3924,
	"./en-ie": 864,
	"./en-ie.js": 864,
	"./en-il": 1579,
	"./en-il.js": 1579,
	"./en-in": 940,
	"./en-in.js": 940,
	"./en-nz": 6181,
	"./en-nz.js": 6181,
	"./en-sg": 4301,
	"./en-sg.js": 4301,
	"./eo": 5291,
	"./eo.js": 5291,
	"./es": 4529,
	"./es-do": 3764,
	"./es-do.js": 3764,
	"./es-mx": 2584,
	"./es-mx.js": 2584,
	"./es-us": 3425,
	"./es-us.js": 3425,
	"./es.js": 4529,
	"./et": 5203,
	"./et.js": 5203,
	"./eu": 678,
	"./eu.js": 678,
	"./fa": 3483,
	"./fa.js": 3483,
	"./fi": 6262,
	"./fi.js": 6262,
	"./fil": 2521,
	"./fil.js": 2521,
	"./fo": 4555,
	"./fo.js": 4555,
	"./fr": 3131,
	"./fr-ca": 8239,
	"./fr-ca.js": 8239,
	"./fr-ch": 1702,
	"./fr-ch.js": 1702,
	"./fr.js": 3131,
	"./fy": 267,
	"./fy.js": 267,
	"./ga": 3821,
	"./ga.js": 3821,
	"./gd": 1753,
	"./gd.js": 1753,
	"./gl": 4074,
	"./gl.js": 4074,
	"./gom-deva": 2762,
	"./gom-deva.js": 2762,
	"./gom-latn": 5969,
	"./gom-latn.js": 5969,
	"./gu": 2809,
	"./gu.js": 2809,
	"./he": 5402,
	"./he.js": 5402,
	"./hi": 315,
	"./hi.js": 315,
	"./hr": 410,
	"./hr.js": 410,
	"./hu": 8288,
	"./hu.js": 8288,
	"./hy-am": 7928,
	"./hy-am.js": 7928,
	"./id": 1334,
	"./id.js": 1334,
	"./is": 6959,
	"./is.js": 6959,
	"./it": 4864,
	"./it-ch": 1124,
	"./it-ch.js": 1124,
	"./it.js": 4864,
	"./ja": 6141,
	"./ja.js": 6141,
	"./jv": 9187,
	"./jv.js": 9187,
	"./ka": 2136,
	"./ka.js": 2136,
	"./kk": 4332,
	"./kk.js": 4332,
	"./km": 8607,
	"./km.js": 8607,
	"./kn": 4305,
	"./kn.js": 4305,
	"./ko": 234,
	"./ko.js": 234,
	"./ku": 6003,
	"./ku.js": 6003,
	"./ky": 5061,
	"./ky.js": 5061,
	"./lb": 2786,
	"./lb.js": 2786,
	"./lo": 6183,
	"./lo.js": 6183,
	"./lt": 29,
	"./lt.js": 29,
	"./lv": 4169,
	"./lv.js": 4169,
	"./me": 8577,
	"./me.js": 8577,
	"./mi": 8177,
	"./mi.js": 8177,
	"./mk": 337,
	"./mk.js": 337,
	"./ml": 5260,
	"./ml.js": 5260,
	"./mn": 2325,
	"./mn.js": 2325,
	"./mr": 4695,
	"./mr.js": 4695,
	"./ms": 5334,
	"./ms-my": 7151,
	"./ms-my.js": 7151,
	"./ms.js": 5334,
	"./mt": 3570,
	"./mt.js": 3570,
	"./my": 7963,
	"./my.js": 7963,
	"./nb": 8028,
	"./nb.js": 8028,
	"./ne": 6638,
	"./ne.js": 6638,
	"./nl": 302,
	"./nl-be": 6782,
	"./nl-be.js": 6782,
	"./nl.js": 302,
	"./nn": 3501,
	"./nn.js": 3501,
	"./oc-lnc": 563,
	"./oc-lnc.js": 563,
	"./pa-in": 869,
	"./pa-in.js": 869,
	"./pl": 5302,
	"./pl.js": 5302,
	"./pt": 9687,
	"./pt-br": 4884,
	"./pt-br.js": 4884,
	"./pt.js": 9687,
	"./ro": 5773,
	"./ro.js": 5773,
	"./ru": 3627,
	"./ru.js": 3627,
	"./sd": 355,
	"./sd.js": 355,
	"./se": 3427,
	"./se.js": 3427,
	"./si": 1848,
	"./si.js": 1848,
	"./sk": 4590,
	"./sk.js": 4590,
	"./sl": 184,
	"./sl.js": 184,
	"./sq": 6361,
	"./sq.js": 6361,
	"./sr": 8965,
	"./sr-cyrl": 1287,
	"./sr-cyrl.js": 1287,
	"./sr.js": 8965,
	"./ss": 5456,
	"./ss.js": 5456,
	"./sv": 451,
	"./sv.js": 451,
	"./sw": 7558,
	"./sw.js": 7558,
	"./ta": 1356,
	"./ta.js": 1356,
	"./te": 3693,
	"./te.js": 3693,
	"./tet": 1243,
	"./tet.js": 1243,
	"./tg": 2500,
	"./tg.js": 2500,
	"./th": 5768,
	"./th.js": 5768,
	"./tk": 7761,
	"./tk.js": 7761,
	"./tl-ph": 5780,
	"./tl-ph.js": 5780,
	"./tlh": 9590,
	"./tlh.js": 9590,
	"./tr": 3807,
	"./tr.js": 3807,
	"./tzl": 3857,
	"./tzl.js": 3857,
	"./tzm": 654,
	"./tzm-latn": 8806,
	"./tzm-latn.js": 8806,
	"./tzm.js": 654,
	"./ug-cn": 845,
	"./ug-cn.js": 845,
	"./uk": 9232,
	"./uk.js": 9232,
	"./ur": 7052,
	"./ur.js": 7052,
	"./uz": 7967,
	"./uz-latn": 2233,
	"./uz-latn.js": 2233,
	"./uz.js": 7967,
	"./vi": 8615,
	"./vi.js": 8615,
	"./x-pseudo": 2320,
	"./x-pseudo.js": 2320,
	"./yo": 1313,
	"./yo.js": 1313,
	"./zh-cn": 4490,
	"./zh-cn.js": 4490,
	"./zh-hk": 5910,
	"./zh-hk.js": 5910,
	"./zh-mo": 8262,
	"./zh-mo.js": 8262,
	"./zh-tw": 4223,
	"./zh-tw.js": 4223
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6700;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map