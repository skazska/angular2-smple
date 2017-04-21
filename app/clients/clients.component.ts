/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Client, ClientsService} from "./clients.service";
import {ClientViewComponent} from "./client-view.component";
import { MessageType, Messages, MessagesComponent } from "../messages/messages.component";


@Component({
  selector: 'client-list',
  templateUrl: './app/clients/clients.view.html',
//  styleUrls: [ './app/clients/clients.view.css' ],
  directives: [ ClientViewComponent, MessagesComponent ],
  providers: [ ClientsService ]
})
export class ClientsComponent implements OnInit {
  messages: Messages = new Messages();
  clients: Client[];
  selectedClient: Client;
  mode = 'Observable';
  constructor (
    public clientsService: ClientsService,
    public router: Router
  ) { }
  ngOnInit(){
    this.getClients();
  }
  ngDoCheck(){

  }

  getClients () {
    this.clientsService.getClients()
      .subscribe(
        clients => this.clients = clients,
        error => this.messages.add(error, MessageType.danger)
      );
  }

  onSelect (client: Client) {
    this.selectedClient = client;
    //this.clientsService.selectedClient = client;
    //this.router.navigate(['/Clients/view/', client.id]);
  }
  unSelect(){
    this.selectedClient = null;
    this.getClients();
  }
  newClient(){
    this.selectedClient = new Client();
  }
  delClient(clientId){
    this.clientsService.delClient(clientId)
      .subscribe(
        resp => {this.messages.add("Client deleted", MessageType.success); this.getClients()},
        error => this.messages.add(error, MessageType.danger)
      );
    return false;

  }
}