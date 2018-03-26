import {AureliaConfiguration} from 'aurelia-configuration';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(AureliaConfiguration)
export class SessionState {
    appApiKey:              string;
    appName:                string;
    aureliaConfiguration:   AureliaConfiguration;
    authContext:            adal.AuthenticationContext;
    currentUser:            adal.User;
    router:                 Router;

    constructor(aureliaConfiguration, sessionState) {
        this.aureliaConfiguration = aureliaConfiguration;

        if (!this.authContext) {
            this.authContext = new AuthenticationContext(
                {
                    cacheLocation: "localStorage",
                    clientId: this.aureliaConfiguration.get('azureADApplicationId'),
                    tenant: this.aureliaConfiguration.get('azureADTenant'),
                    postLogoutRedirectUri: window.location.origin
                }
            );
        }

        this.appName = this.aureliaConfiguration.get('name');
        this.appApiKey = this.aureliaConfiguration.get('api.key');
    }

    isLoggedIn() {
        this.currentUser = this.authContext.getCachedUser();

        if (this.currentUser) {
            return true;
        }

        return false;
    }

    redirectToLogin() {
        this.authContext.config.redirectUri = window.location.href;
        this.authContext.login();
    }
}