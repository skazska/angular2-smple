/**
 * Created by ska on 7/29/16.
 */
import { Injectable }     from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Config }         from "../config/config";
import { AuthService }    from "../auth.service";

export class Shop {
  id: number;
  tcId: number;
  clientId: number;
  name: string;
  address: string;
}

@Injectable()
export class ShopsService {
  constructor (
    private http: Http,
    private authService: AuthService
  ) {}

  private url:string = Config.apiHost;

  getTCShops (tcId: number): Observable<Shop[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Tcs/${tcId}/Shops`;

    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  sendTCShop (tcId: number, id: number, shop: Shop): Observable<Shop> {
    let body = Object.keys(shop).reduce(function(body, key){
      if (shop[key] !== null) body[key] = shop[key];
      return body;
    }, {});
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Tcs/${tcId}/Shops`;

    if ( id ) {
      url = `${this.url}Shops/${id}`;
      return this.http.patch(url, body, options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      return this.http.post(url, body, options)
        .map(this.extractData)
        .catch(this.handleError);
    }

  }

  delShop (shopId: number): Observable<any> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Shops/${shopId}`;

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
    if (error._body && error._body.message ) errMsg += ` ( ${error._body.message} )`;
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
