import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators } from '@angular/forms';

import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { SessionService } from "./session.service";
import { AuthService } from "../auth.service";
import { Messages, MessageType, MessagesComponent } from "../messages/messages.component";


@Component({
  selector: 'login',
  templateUrl: '/app/session/login.view.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, MessagesComponent ]
})
export class LoginComponent  {
  constructor (
    private sessionService: SessionService,
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit(){

  }
  ngDoCheck(){
    console.log("form check", this.form)
  }

  ngOnDestroy() {
  }

  form = new FormGroup({
    userId: new FormControl('', Validators.required),
    secret: new FormControl('', Validators.required)
  });

  messages: Messages = new Messages();

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  postSecret: any;
  onSubmit(){
    console.log("login.submit", this);
    this.postSecret = this.sessionService.postSecret(this.form.value.userId, this.form.value.secret)
      .subscribe(
        data => this.success(data),
        err => this.fail(err)
      );
    return false;
  }

  success(data){
    this.postSecret.unsubscribe();
    this.authService.setAccessData({authToken: data.token}, {nik: "user"});
    this.router.navigate([this.authService.redirectUrl||"/"]);

  }

  fail(err){
    this.postSecret.unsubscribe();
    this.messages.add("Auth failed", MessageType.danger);
    //err => this.error = err
  }
}
