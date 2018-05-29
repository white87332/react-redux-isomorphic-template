import { combineEpics } from 'redux-observable';
import postEpics from './postEpic';

const epics = combineEpics(
    ...postEpics
);

export default epics;
