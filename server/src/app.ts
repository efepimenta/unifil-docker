import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as errorHandler from 'errorhandler';
import {ChatRouter} from "./routes/chat";

export class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public static bootstrap(): Server {
        return new Server();
    }

    private config() {
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Enconding', 'Accept', 'Access-Control-Allow-Origin'],
            preflightContinue: true,
            optionsSuccessStatus: 204
        }));
        //mount logger
        this.app.use(logger('dev'));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // catch 404 and forward to error handler
        this.app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {
            response.status(err.status || 500);
            response.json({
                error: 'Server error'
            })
        });

        //error handling
        this.app.use(errorHandler());
    }

    private routes() {
        // this.app.use(jwtMiddleware());
        this.app.use('/api', ChatRouter.routes());
        // this.app.use('/api', UserRouter.routes());
        // this.app.use('/api', AuthRouter.routes());
        // this.app.use('/api', PostRouter.routes());
        // this.app.use('/api', new AuthorRouter().getRouter());
    }
}
