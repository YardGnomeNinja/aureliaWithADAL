import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router, NavigationInstruction, Next, Redirect} from 'aurelia-router';
import {AuthorizeStep} from './authorizeStep'
import {SessionState} from './sessionState'
import 'bootstrap';

@inject(SessionState)
export class App {
    sessionState

    constructor(sessionState) {
        this.sessionState = sessionState
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.sessionState.router = router;

        config.title = 'Aurelia';
        config.options.root = '/';
        config.options.pushState = true;
        config.map([
            { route: ['', 'home'], name: 'home',  moduleId: 'resources/views/home/home', nav: true, title: "Home" },
            { route: ['reports'], name: 'reports',  moduleId: 'resources/views/reports/reports', nav: true, title: "Reports", settings: { auth: true } }
        ]);

        config.addAuthorizeStep(AuthorizeStep);
    }

    logIn() {
        this.sessionState.authContext.login();
    }

    logOut() {
        this.sessionState.authContext.logOut();
    }
}