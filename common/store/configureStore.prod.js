import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/promiseMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState = undefined)
{
    const store = createStore(rootReducer, initialState, compose(
		applyMiddleware(promiseMiddleware)
	));

    return store;
}
