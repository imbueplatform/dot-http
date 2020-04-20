
import { Application } from 'express';

export default (app: Application): Application => {
    
    app.get('/healthcheck', (req, res, next) => {
        return res.json({
            health: 'ok'
        });
    });

    return app;
}