
import { Application } from 'express';
import _ from 'lodash';

const DB = {
    sash: {
        sparks: [{
            spark: 'This is the greatest idea you have ever seen.'
        }, {
            spark: 'World is an amazing place.'
        }]    
    }
}

export default (app: Application): Application => {
    
    app.get('/discovery/:name', (req, res, next) => {
        return res.json(_.get(DB, req.params.name));
    });

    return app;
}