import { switchMap, map, catchError, startWith } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { postSuc, postErr } from '../actions/post';

const postReqEpic = (action$) =>
{
    return (
        action$.ofType('POST_REQ$').pipe(
            switchMap(() => {
                return (
                    ajax({
                        url: '/api',
                        method: 'get',
                    })
                );
            }),
            map((res) => {
                return postSuc(res);
            }),
            catchError((err, obs) => obs.pipe(
                startWith(postErr(err))
            ))
        )
    );
};

export default [
    postReqEpic,
];
