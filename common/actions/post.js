// import * as types from '../constants/actionTypes';
// import dataGet from '../apis/posts';

// export function postsList()
// {
//     return {
//         types: [types.LATEST_LIST_REQUEST, types.LATEST_LIST_SUCCESS, types.LATEST_LIST_ERROR],
//         promise: dataGet(),
//     };
// }

export function postReq()
{
    return {
        type: 'POST_REQ$',
        data: {}
    };
}

export function postSuc()
{
    return {
        type: 'POST_SUC',
        data: {}
    };
}

export function postErr()
{
    return {
        type: 'POST_ERR',
        data: {}
    };
}
