/**
 * Created by ska on 7/29/16.
 */
import { Injectable }     from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Config }         from "../config/config";
import { AuthService }    from "../auth.service";

export class TC {
  id: number;
  name: string;
  address: string;
}

@Injectable()
export class TCService {
  constructor (
    private http: Http,
    private authService: AuthService
  ) {}

  private url:string = Config.apiHost+"TCs";

  getTCs (): Observable<TC[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  sendTC (id: number, tc: TC): Observable<TC> {
    let body = Object.keys(tc).reduce(function(body, key){
      if (tc[key] !== null) body[key] = tc[key];
      return body;
    }, {});
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = this.url;

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

  delTC (tcId: number): Observable<any> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}/${tcId}`;

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
