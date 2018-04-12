import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as socketIo from 'socket.io-client';
import {Message} from "../models/message";
import {Event} from "../models/event";

const SERVER_URL = 'https://ec2-34-217-104-86.us-west-2.compute.amazonaws.com:443';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public closeSocket(): void {
        this.socket.disconnect();
    }

    public join(message: Message): void {
        this.socket.emit('join', message);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public push(message: Message): void {
        this.socket.emit('push', message);
    }

    public onJoin(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('join', (data: Message) => observer.next(data));
        });
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onPush(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('push', (data: any) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
