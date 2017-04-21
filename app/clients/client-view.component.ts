/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit, Input  } from '@angular/core';

import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators } from '@angular/forms';

import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Client, ClientsService} from "./clients.service";
import { MessageType, Messages, MessagesComponent } from "../messages/messages.component";
import {AccountsComponent} from "../accounts/accounts.component";


@Component({
  selector: 'client-view',
  templateUrl: './app/clients/client-view.view.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, AccountsComponent, MessagesComponent ],
  providers: [ ClientsService ]
})
export class ClientViewComponent implements OnInit {
  @Input() client: Client;

  edit: boolean;
  form : FormGroup;

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  messages: Messages = new Messages();

  mode = 'Observable';
  constructor (
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {

    this.edit = !this.client.id ;
    this.form = new FormGroup({
      name: new FormControl(this.client.name, Validators.required),
    });

  }
  ngDoCheck(){

  }

/*
  getAccounts () {
    this.clientsService.getClientAccounts()
      .subscribe(
        client => this.client = client,
        error =>  this.errorMessage = <any>error);
  }
*/

  postClient: any;
  onSubmit(){
    console.log("client.submit", this);
    this.postClient = this.clientsService.sendClient(this.client.id, this.form.value)
      .subscribe(
        data => this.success(data),
        err => this.fail(err)
      );
    return false;
  }

  success(data){
    this.postClient.unsubscribe();
    this.client = data;
    this.edit = false;
  }

  fail(err){
    this.postClient.unsubscribe();
    this.messages.add("Update failed", MessageType.danger);

  }


}