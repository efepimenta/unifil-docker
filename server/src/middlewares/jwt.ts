// import {UserInstance} from '../models/UserModel';

import {Jwt} from '../utils/jwt';

export const jwtMiddleware = () => {

    return (req, res, next): void => {


        let authorization: string = req.get('authorization');
        let namespace = authorization ? authorization.split(' ')[0] : undefined;
        let token: string = authorization ? authorization.split(' ')[1] : undefined;

        req['context'] = {};

        if (!namespace || namespace.toLocaleLowerCase() !== 'bearer') {
            req['context']['authorization'] = undefined;
            return next();
        }

        if (!token) {
            req['context']['authorization'] = undefined;
            return next();
        }

        if (Jwt.verifyToken(token)) {
            req['context']['authorization'] = true;
        } else {
            req['context']['authorization'] = false;
        }

        return next();
    };

};