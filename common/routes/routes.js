import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

// const Status = ({ code, children }) => (
//     <Route render={({ staticContext }) => {
//         if (staticContext)
//         {
//             staticContext.status = code;
//         }
//         return children;
//     }
//     }
//     />
// );
//
// const NotFound = () => (
//   <Status code={404}>
//     <div>
//       <h1>Sorry, can’t find that.</h1>
//     </div>
//   </Status>
// )


export default () => (
    <Switch>
        <Route exact path="/" component={asyncComponent(() => System.import('../path/index/index').then(module => module.default))} />
        <Route exact path="/counter" component={asyncComponent(() => System.import('../path/counter/counter').then(module => module.default))} />
    </Switch>
);
