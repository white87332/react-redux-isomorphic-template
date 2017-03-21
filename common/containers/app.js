import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { AppContainer } from 'react-hot-loader';
// import { I18nextProvider } from 'react-i18next';
import isNode from 'detect-node';
import App from '../routes/app';
import configureStore from '../store/configureStore';

const state = (isNode) ? '' : JSON.parse(window.$REDUX_STATE);
const store = configureStore(state);

render((
    // <AppContainer>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    // </AppContainer>
), document.getElementById('root'));

// if (module.hot)
// {
//     render(
//         <AppContainer>
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <App />
//                 </BrowserRouter>
//             </Provider>
//         </AppContainer>,
//       document.getElementById('root')
//     );
// }
