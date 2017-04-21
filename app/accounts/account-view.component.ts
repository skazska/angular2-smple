/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators } from '@angular/forms';

import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Account, AccountsService } from "./accounts.service";
import { Client } from "../clients/clients.service";
import { MessageType, Messages, MessagesComponent } from "../messages/messages.component";


@Component({
  selector: 'account-view',
  templateUrl: './app/accounts/account-view.view.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, MessagesComponent ],
  providers: [ AccountsService ]
})
export class AccountViewComponent implements OnInit {
  @Input() client: Client;
  @Input() account: Account;
  @Output() accountChange = new EventEmitter();

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
    private accountService: AccountsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {

    this.edit = !this.account.id ;
    this.form = new FormGroup({
      name: new FormControl(this.account.name, Validators.required),
      userId: new FormControl(this.account.userId, Validators.required),
    });

  }
  ngDoCheck(){

  }

  postAccount: any;
  onSubmit(){
    console.log("account.submit", this);
    this.postAccount = this.accountService.sendAccount(this.client.id, this.account.id, this.form.value)
      .subscribe(
        data => this.success(data),
        err => this.fail(err)
      );
    return false;
  }

  success(data){
    this.postAccount.unsubscribe();
    this.account = data;
    this.accountChange.emit(data);
    this.ngOnInit();
  }

  fail(err){
    this.postAccount.unsubscribe();
    this.messages.add(err, MessageType.danger);

  }


}