/**
 * Created by ska on 7/29/16.
 */
import { Injectable }     from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Config }         from "../config/config";
import { AuthService }    from "../auth.service";
import { Message } from "../messages/messages.component";

export class Beacon {
  beaconId1: string;
  beaconId2: string;
  beaconId3: string;
  shopId: number;
  use: string;
}

@Injectable()
export class BeaconsService {
  constructor (
    private http: Http,
    private authService: AuthService
  ) {}

  private url:string = Config.apiHost;

  getShopBeacons (shopId: number): Observable<Beacon[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Shops/${shopId}/Beacons`;

    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  delBeacon (shopId: number, beaconId: number): Observable<any> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Shops/${shopId}/Beacons/${beaconId}`;

    return this.http.delete(url, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  sendBeacon (shopId: number, beacon: Beacon): Observable<Beacon> {
    let body = Object.keys(beacon).reduce(function(body, key){
      if (beacon[key] !== null) body[key] = beacon[key];
      return body;
    }, {});
    //let body = JSON.stringify(beacon);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-AUTH-TOKEN': this.authService.accessData.authToken
    });
    let options = new RequestOptions({ headers: headers });

    let url = `${this.url}Shops/${shopId}/Beacons`;

/*
    if ( id ) {
      url += '/'+id;
      return this.http.patch(url, body, options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
*/
      return this.http.post(url, body, options)
        .map(this.extractData)
        .catch(this.handleError);
/*
    }
*/
  }
//  selectedBeacon: Beacon = new Beacon();

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
