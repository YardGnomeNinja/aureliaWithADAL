import {inject} from 'aurelia-framework';
import {NavigationInstruction, Next, Redirect} from 'aurelia-router';
import {SessionState} from './sessionState'

@inject(SessionState)
export class AuthorizeStep {
    sessionState: SessionState;

    constructor(sessionState) {
        this.sessionState = sessionState;
    }

    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        let requestInfo = this.sessionState.authContext.getRequestInfo(window.location.hash);
        this.sessionState.authContext.saveTokenFromHash(requestInfo);
        
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {     
            let isCallback = this.sessionState.authContext.isCallback(window.location.hash);

            if (isCallback) {
                this.sessionState.authContext.handleWindowCallback();
            }

            var user = this.sessionState.authContext.getCachedUser();

            if (!user) {
                this.sessionState.authContext.config.redirectUri = window.location.href;
                this.sessionState.authContext.login();
            }
        }

        return next();
    }
}