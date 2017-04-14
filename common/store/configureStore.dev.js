import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/promiseMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState = undefined)
{
    const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(promiseMiddleware),
		typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
	));

    if (module.hot)
	{
        module.hot.accept('../reducers', () =>
		{
            store.replaceReducer(require('../reducers').default);
        });
    }
    return store;
}
