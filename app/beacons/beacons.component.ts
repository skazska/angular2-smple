/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit, Input } from '@angular/core';
//import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Beacon, BeaconsService } from "./beacons.service";
import { Shop } from "../shops/shops.service";
import { BeaconViewComponent } from "./beacon-view.component";
import { MessageType, Messages, MessagesComponent } from "../messages/messages.component";


@Component({
  selector: 'beacon-list',
  templateUrl: './app/beacons/beacons.view.html',
//  styleUrls: [ './app/beacons/beacons.view.css' ],
  directives: [ BeaconViewComponent, MessagesComponent ],
  providers: [ BeaconsService ]
})
export class BeaconsComponent implements OnInit {
  @Input() shop: Shop;
  messages: Messages = new Messages();
  beacons: Beacon[];
  selectedBeacon: Beacon;
  mode = 'Observable';
  constructor (
    public beaconsService: BeaconsService
//    public router: Router
  ) { }
  ngOnInit(){
    this.getBeacons();
  }
  ngDoCheck(){

  }

  getBeacons () {
    this.beaconsService.getShopBeacons(this.shop.id)
      .subscribe(
        beacons => this.beacons = beacons,
        error =>  this.messages.add(error, MessageType.danger)
      );
  }

  onSelect (beacon: Beacon) {
    this.selectedBeacon = beacon;
    //this.beaconsService.selectedBeacon = beacon;
    //this.router.navigate(['/Beacons/view/', beacon.id]);
  }
  unSelect(){
    this.selectedBeacon = null;
  }
  newBeacon(){
    this.selectedBeacon = new Beacon();
  }

  onBeaconChange($event){
    this.getBeacons();
    //this.unSelect();

  }

  delBeacon(beacon: number) {
    this.beaconsService.delBeacon(this.shop.id, beacon)
      .subscribe(
        resp => { this.messages.add("Beacon deleted", MessageType.success); this.getBeacons() },
        error => this.messages.add(error, MessageType.danger)
      )
    return false;
  }
}