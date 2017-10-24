import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import isNode from 'detect-node';
import App from '../routes/app';
import configureStore from '../store/configureStore';
import i18nClient from '../i18n/i18n-client';

const state = (isNode) ? '' : JSON.parse(window.$REDUX_STATE);
const store = configureStore(state);
const i18n = window.$i18n;

window.cookies = require('browser-cookies');

i18nClient.changeLanguage(i18n.locale);
i18nClient.addResourceBundle(i18n.locale, 'common', i18n.resources, true);

hydrate((
    <Provider store={store}>
        <I18nextProvider i18n={i18nClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </I18nextProvider>
    </Provider>
), document.getElementById('root'));
