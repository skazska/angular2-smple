/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit, Input } from '@angular/core';
//import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Account, AccountsService } from "./accounts.service";
import { Client } from "../clients/clients.service";
import { AccountViewComponent } from "./account-view.component";
import { MessageType, Messages, MessagesComponent } from "../messages/messages.component";

@Component({
  selector: 'account-list',
  templateUrl: './app/accounts/accounts.view.html',
//  styleUrls: [ './app/accounts/accounts.view.css' ],
  directives: [ AccountViewComponent, MessagesComponent ],
  providers: [ AccountsService ]
})
export class AccountsComponent implements OnInit {
  @Input() client: Client;
  messages: Messages = new Messages();
  accounts: Account[];
  selectedAccount: Account;
  mode = 'Observable';
  constructor (
    public accountsService: AccountsService
//    public router: Router
  ) { }
  ngOnInit(){
    this.getAccounts();
  }
  ngDoCheck(){

  }

  getAccounts () {
    this.accountsService.getAccounts(this.client.id)
      .subscribe(
        accounts => this.accounts = accounts,
        error =>  this.messages.add(error, MessageType.danger)
      );
  }
  onAccountChange($event){
    this.getAccounts();
    this.unSelect();

  }

  onSelect (account: Account) {
    this.selectedAccount = account;
    //this.accountsService.selectedAccount = account;
    //this.router.navigate(['/Accounts/view/', account.id]);
  }
  unSelect(){
    this.selectedAccount = null;
  }
  newAccount(){
    this.selectedAccount = new Account();
  }
  delAccount(accountId: number) {
    this.accountsService.delAccount(this.client.id, accountId)
      .subscribe(
        resp => { this.messages.add("Account deleted", MessageType.success); this.getAccounts() },
        error => this.messages.add(error, MessageType.danger)
      );
    return false;
  }

}