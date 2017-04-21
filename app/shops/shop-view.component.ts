/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit, Input , Output, EventEmitter  } from '@angular/core';

import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators } from '@angular/forms';

import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { TC } from "../tc/tc.service";
import { Shop, ShopsService } from "./shops.service";
import { MessagesComponent, MessageType, Messages } from "../messages/messages.component";
import {BeaconsComponent} from "../beacons/beacons.component";
import {Client} from "../clients/clients.service";
import {ClientsService} from "../clients/clients.service";


@Component({
  selector: 'shop-view',
  templateUrl: './app/shops/shop-view.view.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, BeaconsComponent, MessagesComponent ],
  providers: [ ShopsService, ClientsService ]
})
export class ShopViewComponent implements OnInit {
  @Input() tc: TC;
  @Input() shop: Shop;
  @Output() shopChange = new EventEmitter();


  edit: boolean;
  form : FormGroup;

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  messages: Messages = new Messages();
  clients: Client[];

  mode = 'Observable';
  constructor (
    private shopsService: ShopsService,
    private clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.clientsService.getClients()
      .subscribe(
        clients => this.clients = clients,
        error =>  this.messages.add(error, MessageType.danger)
      );

    this.edit = !this.shop.id ;
    this.form = new FormGroup({
      name: new FormControl(this.shop.name, Validators.required),
      clientId: new FormControl(this.shop.clientId, Validators.required),
    });

  }
  ngDoCheck(){

  }


  postShop: any;
  onSubmit(){
    console.log("shop.submit", this);

    this.shop.name = this.form.value.name;
    this.shop.clientId = parseInt(this.form.value.clientId);

    this.postShop = this.shopsService.sendTCShop(this.tc.id, this.shop.id, this.shop)
      .subscribe(
        data => this.success(data),
        err => this.fail(err)
      );
    return false;
  }

  success(data){
    this.postShop.unsubscribe();
    this.shop = data;
    this.shopChange.emit(data);
    this.edit = false;
  }

  fail(err){
    this.postShop.unsubscribe();
    this.messages.add(err, MessageType.danger);

  }


}