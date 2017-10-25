import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from '../routes/app';
import configureStore from '../store/configureStore';
import i18nClient from '../i18n/i18n-client';
import * as containerClient from '../routes/containerClient';

// store
const state = JSON.parse(window.$REDUX_STATE);
const store = configureStore(state);

// cookies
window.cookies = require('browser-cookies');

// i18n
const i18n = window.$i18n;
i18nClient.changeLanguage(i18n.locale);
i18nClient.addResourceBundle(i18n.locale, 'common', i18n.resources, true);

// init load container
const pathname = location.pathname.split('/')[1];
let containerName;
if (location.pathname === '/')
{
    containerName = 'Index';
}
else
{
    const tmpChar = pathname.substring(0, 1).toUpperCase();
    let postString = pathname.substring(1, pathname.length);
    containerName = tmpChar + postString;
}

containerClient[containerName].loadComponent().then(() => {
    hydrate(
        <Provider store={store}>
            <I18nextProvider i18n={i18nClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    , document.getElementById('root'));
});
