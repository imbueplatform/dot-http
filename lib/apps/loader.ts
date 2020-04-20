import { Application } from 'express';

import fs from 'fs';
import path from 'path';

import Debug from 'debug';
const debug = Debug("imbue:http:loader");

const routePath: string = path.join(path.resolve(__dirname),'applications');

export const boot = (app: Application): Application => {

    if(!fs.existsSync(routePath))
        throw Error(`${routePath} doesn't exist.`);

    debug(routePath);

    fs.readdirSync(routePath)
        .filter((routeFile) => routeFile.endsWith('.js'))
        .forEach((routeFile) => {
        
            let namespace = routeFile.substr(0, routeFile.indexOf('.'));
            let cleanPath = path.join(routePath, namespace);
            let cleanRoutePath = path.resolve(cleanPath);

            require(cleanRoutePath).default(app);

            debug('loaded', namespace, 'routes');
    });

    return app;
}