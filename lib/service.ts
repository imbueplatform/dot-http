import http from 'http';
import https from 'https';
import tls from 'tls';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { boot } from './apps/loader';

import Debug from 'debug';
const debug = Debug("imbue:http:service");

export interface DotHttpConfig {
    port?: Number,
    secureContextOptions?: tls.SecureContextOptions
}

export const DEFAULT_HTTP_PORT: number = 8080;

export class DotHttp {

    private _app: express.Express = express();
    private _service: http.Server | https.Server;

    constructor(private dotHttpConfig?: DotHttpConfig) {
        this._app = express();

        this._service = this.dotHttpConfig?.secureContextOptions ? 
            new https.Server(this.dotHttpConfig.secureContextOptions, this._app) :
            new http.Server(this._app);

        this.initMiddleware();
        this.loadRoutes();
    }

    private initMiddleware(): void {
        this._app.use(bodyParser.json());
        this._app.use(cors());
        this._app.use(helmet());
        this._app.use(morgan('combined'));
    }

    private loadRoutes(): void {
        boot(this._app);
    }

    public listen(port?: Number): Promise<DotHttp> {
        let listeningPort: Number = port ? port : this.dotHttpConfig?.port ? this.dotHttpConfig.port : DEFAULT_HTTP_PORT;
        return new Promise((res) => {
            this._service.listen(listeningPort, () => {
                debug("listening on port ", listeningPort);
                return res(this);
            });
        });
    }
}