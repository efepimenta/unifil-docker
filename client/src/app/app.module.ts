import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SocketService} from "./services/socket.service";
import {ReactiveFormsModule} from "@angular/forms";
import { ChatComponent } from './chat/chat.component';


@NgModule({
    declarations: [
        AppComponent,
        ChatComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
    providers: [SocketService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
