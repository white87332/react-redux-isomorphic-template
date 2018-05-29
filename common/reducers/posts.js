import update from 'immutability-helper';
// import * as types from '../constants/actionTypes';

const initialItems = {
    list: []
};

export default function posts(state = initialItems, action = {})
{
    switch (action.type)
    {
        case 'POST_SUC':
            return update(state, {
                list: { $set: action.data }
            });

        default:
            return state;
    }
}
