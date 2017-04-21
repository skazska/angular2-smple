/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit, Input } from '@angular/core';
//import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Shop, ShopsService } from "./shops.service";
import { TC } from "../tc/tc.service";
import { ShopViewComponent } from "./shop-view.component";
import { MessagesComponent, MessageType, Messages } from "../messages/messages.component";


@Component({
  selector: 'shop-list',
  templateUrl: './app/shops/shops.view.html',
//  styleUrls: [ './app/shops/shops.view.css' ],
  directives: [ ShopViewComponent, MessagesComponent ],
  providers: [ ShopsService ]
})
export class ShopsComponent implements OnInit {
  @Input() tc: TC;
  messages: Messages = new Messages();
  shops: Shop[];
  selectedShop: Shop;
  mode = 'Observable';
  constructor (
    public shopsService: ShopsService
//    public router: Router
  ) { }
  ngOnInit(){
    this.getShops();
  }
  ngDoCheck(){
//    console.log("check shops");
  }

  getShops () {
    this.shopsService.getTCShops(this.tc.id)
      .subscribe(
        shops => this.shops = shops,
        error =>  this.messages.add(error, MessageType.danger)
      );
  }

  onShopChange($event){
    this.getShops();
//    this.selectedShop = null;

  }

  onSelect (shop: Shop) {
    this.selectedShop = shop;
    //this.shopsService.selectedShop = shop;
    //this.router.navigate(['/Shops/view/', shop.id]);
  }
  unSelect(){
    this.selectedShop = null;
    this.getShops();
  }
  newShop(){
    this.selectedShop = new Shop();
  }
  delShop(shop: number) {
    this.shopsService.delShop(shop)
      .subscribe(
        resp => { this.messages.add("Shop deleted", MessageType.success); this.getShops() },
        error => this.messages.add(error, MessageType.danger)
      );
    return false;
  }

}