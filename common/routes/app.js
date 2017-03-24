import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { routes } from './routes';

export default () => (
    <Switch>
        {routes.map(route => (
            <Route key={uniqueId()} {...route} />
        ))}
    </Switch>
);

/* <I18nextProvider>
    <Switch>
        <Route exact path="/" component={asyncComponent(() => System.import('../path/index/index').then(module => module.default))} />
        <Route exact path="/" component={Index} />
        <Route exact path="/counter" component={Counter} />
        <Route exact path="/" component={asyncComponent(() => System.import(routeArray[0]).then(module => module.default))} />
        <Route exact path="/counter" component={asyncComponent(() => System.import(routeArray[1]).then(module => module.default))} />
    </Switch>
</I18nextProvider> */
