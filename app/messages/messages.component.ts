/**
 * Created by ska on 7/29/16.
 */
import { Component, Input } from '@angular/core';

export enum MessageType {success, info, warning, danger}

export class Message {
  constructor(
    public text: string,
    public type: MessageType
  ) {  }
}

export class Messages {
  list: Array<Message> = [];

  addMessage(message: Message){
    this.list.push(message);
  }
  add(message: string, type: MessageType){
    this.list.push(new Message(message, type));
  }
}



@Component({
  selector: 'message',
  template: `
    <div class="alert" [ngClass]="alertClass()" role="alert">{{message.text}}</div>
  `
})
export class MessageComponent {
  @Input() message: Message;
  alertClass() {
    return "alert-"+MessageType[this.message.type]
  }
}


@Component({
  selector: 'messages',
  directives: [ MessageComponent ],
  template: `
    <message *ngFor = "let message of messages.list" [message]="message">
  `

})
export class MessagesComponent {
  @Input() messages: Messages
}

