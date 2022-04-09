import express from 'express';
import {json} from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// use library morgan for logging requests method and url to the console in development mode

// cau hinh server express

const app = express();

//  use library body-parser de parse body request with json
export function startExpressServer(){
    app.use(json());
    app.use(cors());
    app.use(morgan(":date[clf] :method :url :status :res[content-length] - :response-time ms"));
    // response with 'hello world' when a GET request is made to the homepage
    // request is an object give to client when they make a request server
    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.post('/post',(req,res)=>{
        console.log('body',req.body);
        res.json(req.body);
        
    })

    app.listen(4000, () => {
        console.log('server listening on port http://localhost:4000');
    });

};

export default app;