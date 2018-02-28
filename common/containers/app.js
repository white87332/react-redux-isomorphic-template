import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { CookiesProvider } from 'react-cookie';
import App from '../routes/app';
import configureStore from '../store/configureStore';
import i18nClient from '../i18n/i18n-client';
import * as containerClient from '../routes/containerClient';

// store
const state = JSON.parse(window.$REDUX_STATE);
const store = configureStore(state);
delete window.$REDUX_STATE;

// i18n
const initialI18nStore = window.$initialI18nStore;
const initialLanguage = window.$initialLanguage;
delete window.$initialI18nStore;
delete window.$initialLanguage;

// cookies for window
window.browserCookies = require('browser-cookies');

// init load container
const { splitPoints } = window;
Promise.all(splitPoints.map(chunk => containerClient[chunk].loadComponent().then(() =>
{
    hydrate(
        <Provider store={store}>
            <I18nextProvider
                i18n={i18nClient}
                initialI18nStore={initialI18nStore}
                initialLanguage={initialLanguage}
            >
                <BrowserRouter>
                    <CookiesProvider>
                        <App />
                    </CookiesProvider>
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
        , document.getElementById('root'));
})));
