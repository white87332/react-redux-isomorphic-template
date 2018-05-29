import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { wrapRootEpic } from 'react-redux-epic';
// import promiseMiddleware from '../middleware/promiseMiddleware';
import rootReducer from '../reducers';
import rootEpic from '../epics';

const wrappedEpic = wrapRootEpic(rootEpic);
const epicMiddleware = createEpicMiddleware(wrappedEpic);

export default function configureStore(initialState = undefined)
{
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(epicMiddleware)
    ));

    return store;
}
