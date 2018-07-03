import React from 'react';
import { renderToString } from 'react-dom/server';
import { applyMiddleware, createStore } from 'redux';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { matchRoutes } from 'react-router-config';
import { I18nextProvider } from 'react-i18next';
import serialize from 'serialize-javascript';
import { CookiesProvider } from 'react-cookie';
import promiseMiddleware from '../../../common/middleware/promiseMiddleware';
import App from '../../../common/routes/app';
import { routes } from '../../../common/routes/routes';
import rootReducer from '../../../common/reducers';

const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);

function loadBranchData(branch, dispatch, url, query)
{
    const promises = branch.map(({ route, match }) => {
        // loadData
        if (route.loadData)
        {
            match.params.query = query;
            return route.loadData(dispatch, match.params);
        }
        else
        {
            return Promise.resolve(null);
        }
    });

    return Promise.all(promises);
}

export default function reactRender(app)
{
    app.use((req, res, next) => {
        const { url } = req;
        if (url.indexOf('/api') !== -1 || url.indexOf('/favicon.ico') !== -1)
        {
            next();
        }
        else
        {
            const context = {
                splitPoints: []
            };

            if (context.url)
            {
                res.writeHead(301, {
                    Location: context.url
                });
                res.end();
            }
            else
            {
                const { query, i18n, universalCookies } = req;
                const store = finalCreateStore(rootReducer);
                const urlNoquery = url.split('?')[0];
                const branch = matchRoutes(routes, urlNoquery);
                if (branch.length > 0)
                {
                    loadBranchData(branch, store.dispatch, urlNoquery, query)
                        .then(() => {
                            // i18n
                            let initialI18nStore = {};
                            const initialLanguage = i18n.language;

                            i18n.languages.forEach((l) => {
                                initialI18nStore[l] = i18n.services.resourceStore.data[l];
                            });

                            // style-components sheet
                            const sheet = new ServerStyleSheet();

                            // app
                            const html = renderToString(
                                <Provider store={store}>
                                    <I18nextProvider i18n={i18n}>
                                        <StaticRouter location={url} context={context}>
                                            <CookiesProvider cookies={universalCookies}>
                                                <StyleSheetManager sheet={sheet.instance}>
                                                    <App />
                                                </StyleSheetManager>
                                            </CookiesProvider>
                                        </StaticRouter>
                                    </I18nextProvider>
                                </Provider>
                            );

                            const helmet = Helmet.renderStatic();
                            const bundleJs = (process.env.NODE_ENV === 'development') ? 'bundle.js' : 'bundle.min.js';
                            const { splitPoints } = context;

                            res.send(`
                                <!doctype html>
                                <html ${helmet.htmlAttributes.toString()}>
                                    <head>
                                        ${helmet.title.toString()}
                                        ${helmet.meta.toString()}
                                        ${helmet.link.toString()}
                                        <link rel="shortcut icon" href="/asset/img/favicon.ico" type="image/x-icon" />
                                        <link rel="stylesheet" type="text/css" href="/asset/css/normalize/normalize.min.css">
                                        ${sheet.getStyleTags()}
                                    </head>
                                    <body ${helmet.bodyAttributes.toString()}>
                                        <div id="root">${html}</div>
                                        <script>window.$REDUX_STATE = ${serialize(JSON.stringify(store.getState()))}</script>
                                        <script>window.$initialI18nStore = ${JSON.stringify(initialI18nStore)}</script>
                                        <script>window.$initialLanguage = '${initialLanguage}'</script>
                                        <script>window.splitPoints=${JSON.stringify(splitPoints)}</script>
                                        <script async src="/dist/${bundleJs}"></script>
                                    </body>
                                </html>
                            `);
                        })
                        .catch((err) => {
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
