import {Request, Response, Router} from 'express';

export class ChatRouter {

    static routes(): Router {
        return Router()
            .get('/chat', (request: Request, response: Response) => {
                response.json({get: 'enfermeira'});
            })
            .post('/chat', (request: Request, response: Response) => {
                response.json({post: 'enfermeira'});
            })
            .post('/chat/media', (request: Request, response: Response) => {
                response.json({post: 'enfermeira', media: 'meira'});
            })
            .put('/chat/:id', (request: Request, response: Response) => {
                response.json({put: 'enfermeira'});
            })
            .delete('/chat/:id', (request: Request, response: Response) => {
                response.json({delete: 'enfermeira'});
            })
    }
}
