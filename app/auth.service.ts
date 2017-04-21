import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
//import memberSetAccessorElement = ts.ScriptElementKind.memberSetAccessorElement;

class AccessData {
  authToken: string;
}

class AccessUser {

}

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false; //as for dev TODO change to false;
  accessData: AccessData = {authToken: "b675f17ee7605ac26b79faeef0df1d5c7c96"} ;
  user: AccessUser;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  setAccessData(access, user){
    this.isLoggedIn = true;
    this.accessData = access;
    this.user = user;
  }
}
