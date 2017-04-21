/**
 * Created by ska on 7/27/16.
 */
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { TC, TCService } from "./tc.service";
import { TCViewComponent } from "./tc-view.component";
import { MessageType, Messages, MessagesComponent } from "../messages/messages.component";
import { Observable }     from 'rxjs/Observable';

@Component({
  selector: 'tc-list',
  templateUrl: './app/tc/tc.view.html',
//  styleUrls: [ './app/tcs/tcs.view.css' ],
  directives: [ TCViewComponent, MessagesComponent ],
  providers: [ TCService ]
})
export class TCComponent implements OnInit {
  messages: Messages = new Messages();
  tcs: TC[];
  selectedTC: TC;
  observableTC: Observable<{}>;
  observerTC: any;

  mode = 'Observable';
  constructor (
    public tcService: TCService,
    public router: Router
  ) { }
  ngOnInit(){
    this.getTCs();
    this.observableTC = new Observable(observer => {
      this.observerTC = observer;
    });
    this.observableTC.publish().connect();

  }
  ngDoCheck(){

  }

  getTCs () {
    this.tcService.getTCs()
      .subscribe(
        tcs => this.tcs = tcs,
        error =>  this.messages.add(error, MessageType.danger)
      );
  }

  onTCChange($event){
    this.getTCs();

  }

  onSelect (tc: TC) {
    //this.selectedTC = null;
    this.observerTC.next(tc);
    this.selectedTC = tc;
    //this.tcsService.selectedTc = tc;
    //this.router.navigate(['/Tcs/view/', tc.id]);
  }
  unSelect(){
    this.selectedTC = null;
    //this.getTCs();
  }
  newTC(){
//    this.selectedTC = new TC();
    this.onSelect(new TC());
  }
  delTC(tcId: number) {
    this.tcService.delTC(tcId)
      .subscribe(
        resp => { this.messages.add("TC deleted", MessageType.success); this.getTCs()},
        error => this.messages.add(error, MessageType.danger)
      );
    return false;
  }

}