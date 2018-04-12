import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../services/socket.service';
import {Action} from '../models/action';
import {Message} from '../models/message';
import {User} from '../models/user';
import {Event} from '../models/event';
import * as moment from 'moment';

const AVATAR_URL = 'https://api.adorable.io/avatars/';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  ioConnection: any;
  messages: Message[] = [];
  // lastmessages: Message[] = [];
  user: User;
  messageContent: string;
  iniciado = false;
  // wellcome: string[] = [];

  form: FormGroup;
  formUser: FormGroup;

  chatOpened = false;

  constructor(private socketService: SocketService) {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.formUser = new FormGroup({
      username: new FormControl(null, [Validators.required])
    });
  }

  callChat() {
    this.chatOpened = !this.chatOpened;
    if (!this.chatOpened) {
      this.close();
    }
  }

  onSubmit() {
    // this.alert.subscription.next({show: false});
    this.sendMessage(this.form.value.message)
  }

  ngOnInit() {
    this.initModel();
    // Using timeout due to https://github.com/angular/angular/issues/14748
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
    };
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    // this.ioConnection = this.socketService.onJoin()
    //   .subscribe((message: Message) => {
    //     console.log('join');
    //   });

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        console.log(message);
        if (message.content) {
          this.messages.push(message);
        }
      });

    // this.ioConnection = this.socketService.onPush()
    //   .subscribe((message: any) => {
    //     this.lastmessages = message;
    //   });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connectado');
        this.iniciado = true;
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        this.user.name = '';
        this.iniciado = false;
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this.socketService.send({
      from: this.user,
      content: message
    });
    this.form.patchValue({
      message: ''
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.join(message);
  }

  public init(): void {
    this.user.name = this.formUser.value.username;
    this.user.avatar = AVATAR_URL + String(this.user.id);
    this.initIoConnection();
    this.sendNotification({user: this.user.name}, Action.JOINED);
  }

  ngOnDestroy(): void {
    this.close();
  }

  close() {
    this.messages = [];
    this.sendMessage(this.user.name + ' saiu do chat');
    this.socketService.closeSocket();
  }

  dateNow() {
    return moment().format('hh:MM:ss');
  }

  // pushMessages(name?: string) {
  //   this.socketService.push({
  //     from: {name: name}
  //   });
  // }

}
