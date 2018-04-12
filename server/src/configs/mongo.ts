import db = require('mongoose');
import {config} from './database';

db.Promise = global.Promise;

db.connect(`mongodb://${config.db.mongo.host}/${config.db.mongo.database}`, {
    useMongoClient: true,
    user: config.db.mongo.username,
    pass: config.db.mongo.password
});

export {db};
