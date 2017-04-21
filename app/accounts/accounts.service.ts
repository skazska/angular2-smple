/**
 * Created by ska on 7/29/16.
 */
import { Injectable }     from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Config }         from "../config/config";
import { AuthService }    from "../auth.service";

export class Account {
  id: number;
//  clientId: number;
  name: string;
  userId: string;
  roles: Array<string>;
}

@Injectable()
export class AccountsService {
  constructor (
    private http: Http,
    private authService: AuthService
  ) {}

  private url:string = Config.apiHost;

  getAccounts (clientId: number): Observable<Account[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Clients/${clientId}/Accounts`;

    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  sendAccount (clientId: number, id: number, account: Account): Observable<Account> {
    let body = JSON.stringify(account);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Clients/${clientId}/Accounts`;

    if ( id ) {
      url += '/'+id;
      return this.http.patch(url, body, options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      return this.http.post(url, body, options)
        .map(this.extractData)
        .catch(this.handleError);
    }

  }
  delAccount (clientId:number, accountId: number): Observable<any> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Clients/${clientId}/Accounts/${accountId}`;

    return this.http.delete(url, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
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
