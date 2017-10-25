import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { matchRoutes } from 'react-router-config';
import { I18nextProvider } from 'react-i18next';
import serialize from 'serialize-javascript';
import { merge } from 'lodash';
import { readFileSync } from 'fs';
import promiseMiddleware from '../../../common/middleware/promiseMiddleware';
import App from '../../../common/routes/app';
import { routes } from '../../../common/routes/routes';
import rootReducer from '../../../common/reducers';
import i18n from '../i18n/i18n-server';

const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);

async function i18nResource(locale, locales = ['common'])
{
    function readFile(ns)
    {
        return new Promise((resolve, reject) => {
            try
            {
                resolve(JSON.parse(readFileSync(`locales/${locale}/${ns}.json`, 'utf8')));
            }
            catch (e)
            {
                reject(e);
            }
        });
    }

    const obj = await Promise.all(locales.map(ns => readFile(ns)));

    let finalObj = {};
    for (const innerObj of obj)
    {
        finalObj = merge(finalObj, innerObj);
    }

    return finalObj;
}

function loadBranchData(dispatch, url, locale, query)
{
    let resources;
    let i18nServer;
    let i18nClient;
    const branch = matchRoutes(routes, url);
    locale = ['zh', 'en'].indexOf(locale) === -1 ? 'zh' : locale;

    const promises = branch.map(({ route, match }) =>
    {
        // i18n
        resources = i18nResource(locale, route.locales);

        i18nServer = i18n.cloneInstance();
        i18nServer.changeLanguage(locale);
        i18nClient = { locale, resources };

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

    promises.unshift(Promise.resolve(
        {
            i18nServer,
            i18nClient
        }
    ));

    return Promise.all(promises);
}

export default function reactRender(app)
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
                const store = finalCreateStore(rootReducer);
                const urlNoquery = url.split('?')[0];
                const branch = matchRoutes(routes, urlNoquery);
                if (branch.length > 0)
                {
                    loadBranchData(store.dispatch, urlNoquery, req.locale, req.query)
                        .then(async (data) =>
                        {
                            let i18nObj = data[0];
                            i18nObj.i18nClient.resources = await i18nObj.i18nClient.resources;

                            // 語系讀取錯誤
                            if (!i18nObj.i18nClient.resources)
                            {
                                res.redirect('/notFound');
                            }
                            else
                            {
                                let bundleJs = 'bundle.min.js';
                                let bundleCss = '<link rel=\'stylesheet\' type=\'text/css\' href=\'/asset/css/bundle/bundle.min.css\'>';
                                if (process.env.NODE_ENV === 'development')
                                {
                                    bundleJs = 'bundle.js';
                                    bundleCss = '';
                                }

                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.write('<!doctype html>', 'utf8');
                                res.write('<html lang="utf-8">', 'utf8');
                                res.write(`<head>
                                                <meta charset="utf-8">
                                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                                <meta name="description" content="">
                                                <link rel="shortcut icon" href="/asset/img/favicon.ico" type="image/x-icon" />
                                                <title>react-redux-isomorphic</title>
                                                ${bundleCss}
                                            </head>`, 'utf8');
                                res.write('<body><div id=root>', 'utf8');
                                const stream = renderToNodeStream(
                                    <Provider store={store}>
                                        <I18nextProvider i18n={i18nObj.i18nServer}>
                                            <StaticRouter location={url} context={context}>
                                                <App />
                                            </StaticRouter>
                                        </I18nextProvider>
                                    </Provider>
                                );
                                stream.pipe(res, { end: false });
                                stream.on('end', () => {
                                    res.write('</div>', 'utf8');
                                    res.write(`<script>window.$REDUX_STATE = ${serialize(JSON.stringify(store.getState()))}</script>
                                                <script>window.$i18n = ${serialize(i18nObj.i18nClient)}</script>
                                                <script>window.splitPoints=${JSON.stringify(context.splitPoints)}</script>
                                                <script async src="/asset/js/bundle/${bundleJs}"></script>
                                                <script>window.splitPoints=${JSON.stringify(context.splitPoints)}</script>
                                              </body>
                                          </html>`, 'utf8');
                                    res.end();
                                });
                            }
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
