import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config/config';
import {AuthService} from "../auth.service";


@Injectable()
export class SessionService {
  private url:string = Config.apiHost+"session";

  private secret: string = '';
//  private token: string = '';
//  private error: any;

//  public username: string = '';
//  public redirectUrl: string = '';

  constructor(
    private http: Http
//    private authService: AuthService
  ){}

  postSecret(userId, secret) {
    let body = JSON.stringify({
      userId: userId,
      pass: (secret=='test'?this.secret:secret)
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
      .map(this.extractPostData)
      .catch(this.handleError);
  }

  requestSecret(userId) {
    return this.http.get(this.url)
      .map(this.extractGetData)
      .catch(this.handleError);
//      .subscribe(
//        data => { this.username = userId; if (data.pass) this.secret = data.pass; } ,
//        err => this.error = err
//      );
  }

  private extractPostData(res: Response) {
    console.log("post session", res);
    return res.json();
  }

  private extractGetData(res: Response) {
    console.log("get session", res);
    return res.json();
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (error._body && error._body ) errMsg += ` ( ${JSON.parse(error._body).message} )`;
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}