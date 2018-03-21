import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {AureliaConfiguration} from "aurelia-configuration";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
    aurelia.use.plugin('aurelia-configuration', config => {
        config.setConfig('dev.json');
    });
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  if (!environment.debug && !environment.testing) {
    aurelia.use.plugin('aurelia-configuration', config => {
        config.setConfig('prod.json');
    });
  }

  aurelia.start().then(() => aurelia.setRoot());
}
