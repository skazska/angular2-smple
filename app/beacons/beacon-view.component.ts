/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators } from '@angular/forms';

import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Beacon, BeaconsService } from "./beacons.service";
import { Shop } from "../shops/shops.service";
import { MessageType, Messages, MessagesComponent } from "../messages/messages.component";


@Component({
  selector: 'beacon-view',
  templateUrl: './app/beacons/beacon-view.view.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, MessagesComponent ],
  providers: [ BeaconsService ]
})
export class BeaconViewComponent implements OnInit {
  @Input() shop: Shop;
  @Input() beacon: Beacon;
  @Output() beaconChange = new EventEmitter();
  //@Output() beaconChange: EventEmitter = new EventEmitter(true);

  edit: boolean;
  form : FormGroup;

  messages: Messages = new Messages();

  mode = 'Observable';
  constructor (
    private beaconService: BeaconsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {

    this.edit = !this.beacon.beaconId1 ;
    this.form = new FormGroup({
      beaconId1: new FormControl(this.beacon.beaconId1, Validators.required),
      beaconId2: new FormControl(this.beacon.beaconId2),
      beaconId3: new FormControl(this.beacon.beaconId3),
      use: new FormControl(this.beacon.use, Validators.required),
    });

  }
  ngDoCheck(){

  }

  postBeacon: any;
  onSubmit(){
    console.log("beacon.submit", this);
    this.postBeacon = this.beaconService.sendBeacon(this.shop.id, this.form.value)
      .subscribe(
        data => this.success(data),
        err => this.fail(err)
      );
    return false;
  }

  success(data){
    this.postBeacon.unsubscribe();
    this.beacon = new Beacon();
    this.beaconChange.emit(data);
    this.ngOnInit();
  }

  fail(err){
    this.postBeacon.unsubscribe();
    this.messages.add(err, MessageType.danger);

  }


}