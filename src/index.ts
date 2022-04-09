// import run from './exam';
// run();

import app, { startExpressServer } from "./express";
import graphqlServer from './apollo';

startExpressServer();


graphqlServer.start().then(() => {
    graphqlServer.applyMiddleware({app});
});