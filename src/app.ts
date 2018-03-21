import 'bootstrap';
//import 'adal';
import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
    router: Router;

    constructor() {
        //let authContext = new AuthenticationContext({ clientId: 'asdf' });
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.title = 'Aurelia';
        config.options.root = '/';
        config.options.pushState = true;
        config.map([
            { route: ['login'], name: 'login',  moduleId: 'resources/views/login/index' },
            { route: ['', 'home'], name: 'home',  moduleId: 'resources/views/home/index', nav: true, title: "Home" },
            { route: ['reports'], name: 'reports',  moduleId: 'resources/views/reports/index', nav: true, title: "Reports" }
        ]);
    }
}
