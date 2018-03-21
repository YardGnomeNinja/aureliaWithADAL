import 'bootstrap';
//import 'adal';
import {RouterConfiguration, Router} from 'aurelia-router';
import {AureliaConfiguration} from 'aurelia-configuration';
import {inject} from 'aurelia-framework';

@inject(AureliaConfiguration)
export class App {
    appName
    appApiKey
    aureliaConfiguration
    router: Router

    constructor(aureliaConfiguration) {
        //let authContext = new AuthenticationContext({ clientId: 'asdf' });
        this.aureliaConfiguration = aureliaConfiguration

        this.appName = this.aureliaConfiguration.get('name')
        this.appApiKey = this.aureliaConfiguration.get('api.key')
    }

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.title = 'Aurelia';
        config.options.root = '/';
        config.options.pushState = true;
        config.map([
            { route: ['login'], name: 'login',  moduleId: 'resources/views/login/login' },
            { route: ['', 'home'], name: 'home',  moduleId: 'resources/views/home/home', nav: true, title: "Home" },
            { route: ['reports'], name: 'reports',  moduleId: 'resources/views/reports/reports', nav: true, title: "Reports" }
        ]);
    }
}
