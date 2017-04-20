import React from 'react';
import { renderToString } from 'react-dom/server';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { matchRoutes } from 'react-router-config';
import { I18nextProvider } from 'react-i18next';
import serialize from 'serialize-javascript';
import { merge } from 'lodash';
import promiseMiddleware from '../../../common/middleware/promiseMiddleware';
import App from '../../../common/routes/app';
import { routes } from '../../../common/routes/routes';
import rootReducer from '../../../common/reducers';
import i18n from '../i18n/i18n-server';

const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);

function i18nResource(locale, locales)
{
    let obj;
    for (const val of locales)
    {
        const resource = i18n.getResourceBundle(locale, val);
        obj = merge(obj, resource);
    }
    return obj;
}

function loadBranchData(dispatch, url, locale)
{
    let resources;
    let i18nServer;
    let i18nClient;
    const branch = matchRoutes(routes, url);
    const promises = branch.map(({ route, match }) =>
    {
        resources = (route.locales) ? i18nResource(locale, route.locales) : i18nResource(locale, ['common']);
        i18nServer = i18n.cloneInstance();
        i18nServer.changeLanguage(locale);
        i18nClient = { locale, resources };

        if (route.loadData)
        {
            return route.loadData(dispatch, match.params);
        }

        return Promise.resolve(null);
    });

    promises.unshift(Promise.resolve(
        {
            i18nServer,
            i18nClient
        }
    ));

    return Promise.all(promises);
}

export default function render(app)
{
    app.use((req, res, next) =>
    {
        const url = req.url;
        if (url.indexOf('/api') !== -1 || url.indexOf('/favicon.ico') !== -1)
        {
            next();
        }
        else
        {
            const context = {};
            if (context.url)
            {
                res.writeHead(301, {
                    Location: context.url
                });
                res.end();
            }
            else
            {
                const store = finalCreateStore(rootReducer);
                const branch = matchRoutes(routes, url);
                if (branch.length > 0)
                {
                    let locale = (req.locale.indexOf('zh') === -1 && req.locale.indexOf('cn') === -1) ? 'zh' : req.locale;
                    loadBranchData(store.dispatch, url, locale)
                        .then((data) =>
                        {
                            let i18nObj = data[0];
                            const html = renderToString(
                                <Provider store={store}>
                                    <I18nextProvider i18n={i18nObj.i18nServer}>
                                        <StaticRouter location={url} context={context}>
                                            <App />
                                        </StaticRouter>
                                    </I18nextProvider>
                                </Provider>
                            );

                            let bundleJs = 'bundle.min.js';
                            let bundleCss = '<link rel=\'stylesheet\' type=\'text/css\' href=\'/asset/css/bundle/bundle.min.css\'>';
                            if (process.env.NODE_ENV === 'development')
                            {
                                bundleJs = 'bundle.js';
                                bundleCss = '';
                            }

                            return `
                            <!doctype html>
                            <html lang="utf-8">
                              <head>
                                  <meta charset="utf-8">
                                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                  <meta name="viewport" content="width=device-width, initial-scale=1">
                                  <meta name="description" content="">
                                  <link rel="shortcut icon" href="/asset/img/favicon.ico" type="image/x-icon" />
                                  <title>react-redux-isomorphic</title>
                                  ${bundleCss}
                              </head>
                              <body>
                                <div id="root">${html}</div>
                                <script>window.$REDUX_STATE = ${serialize(JSON.stringify(store.getState()))}</script>
                                 <script>window.$i18n = ${serialize(i18nObj.i18nClient)}</script>
                                <script async src="/asset/js/bundle/${bundleJs}"></script>
                              </body>
                            </html>
                            `;
                        })
                        .then((page) =>
                        {
                            res.status(200).send(page);
                        })
                        .catch((err) =>
                        {
                            res.end(err.message);
                        });
                }
                else
                {
                    res.redirect('/notFound');
                }
            }
        }
    });
}
