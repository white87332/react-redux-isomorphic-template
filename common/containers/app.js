import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { I18nextProvider } from 'react-i18next';
import isNode from 'detect-node';
import App from '../routes/app';
import configureStore from '../store/configureStore';

const state = (isNode) ? '' : JSON.parse(window.$REDUX_STATE);
const store = configureStore(state);

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
