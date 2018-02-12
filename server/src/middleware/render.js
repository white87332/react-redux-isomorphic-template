import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { applyMiddleware, createStore } from 'redux';
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
    const promises = branch.map(({ route, match }) =>
    {
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
    app.use((req, res, next) =>
    {
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
                        .then(() =>
                        {
                            // i18n
                            let initialI18nStore = {};
                            const initialLanguage = i18n.language;

                            i18n.languages.forEach((l) => {
                                initialI18nStore[l] = i18n.services.resourceStore.data[l];
                            });

                            // bundle
                            let bundleJs = 'bundle.min.js';
                            let bundleCss = '<link rel=\'stylesheet\' type=\'text/css\' href=\'/asset/css/bundle/bundle.min.css\'>';
                            if (process.env.NODE_ENV === 'development')
                            {
                                bundleJs = 'bundle.js';
                                bundleCss = '';
                            }

                            // response
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write('<!doctype html>', 'utf8');
                            res.write('<html lang="utf-8">', 'utf8');
                            res.write(`<head>
                                            <meta charset="utf-8">
                                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                            <meta name="viewport" content="width=device-width, initial-scale=1">
                                            <meta name="description" content="">
                                            ${Helmet.renderStatic().meta.toString()}
                                            <link rel="shortcut icon" href="/asset/img/favicon.ico" type="image/x-icon" />
                                            <title>react-redux-isomorphic</title>
                                            ${bundleCss}
                                        </head>`, 'utf8');
                            res.write('<body><div id=root>', 'utf8');

                            // renderToNodeStream
                            const stream = renderToNodeStream(
                                <Provider store={store}>
                                    <I18nextProvider i18n={i18n}>
                                        <StaticRouter location={url} context={context}>
                                            <CookiesProvider cookies={universalCookies}>
                                                <App />
                                            </CookiesProvider>
                                        </StaticRouter>
                                    </I18nextProvider>
                                </Provider>
                            );

                            // stream on end
                            stream.pipe(res, { end: false });
                            stream.on('end', () => {
                                res.write('</div>', 'utf8');
                                res.write(`<script>window.$REDUX_STATE = ${serialize(JSON.stringify(store.getState()))}</script>
                                            <script>window.$initialI18nStore = ${JSON.stringify(initialI18nStore)}</script>
                                            <script>window.$initialLanguage = '${initialLanguage}'</script>
                                            <script>window.splitPoints=${JSON.stringify(context.splitPoints)}</script>
                                            <script async src="/asset/js/bundle/${bundleJs}"></script>
                                          </body>
                                      </html>`, 'utf8');
                                res.end();
                            });
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
