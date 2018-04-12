import * as socketIo from 'socket.io';
import {Chat} from "../models/chat";

class SocketApi {

    private io: socketIo.Server;

    constructor(private server: any, private port: number) {
        this.sockets();
        this.listen();
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {

        this.io.on('connect', (socket: any) => {

            console.log('Connected client on port %s.', this.port);

            socket.on('message', (m: any) => {
                const doc = new Chat(m);
                Chat.create(doc).then(data => {
                    this.io.emit('message', m);
                }).catch(err => {
                    console.log(err);
                });
            });

            socket.on('push', (cli: any) => {
                Chat.find({}, ['-createdAt', '-updatedAt', '-_id', '-__v']).then(data => {
                    this.io.emit('push', data);
                }).catch(err => {
                    console.log(err);
                });
            });

            socket.on('join', (cli: any) => {
                this.io.emit('join', cli);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

}

export {SocketApi}
