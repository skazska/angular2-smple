/**
 * Created by ska on 7/29/16.
 */
import { Component, OnInit, Input , Output, EventEmitter  } from '@angular/core';

import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators } from '@angular/forms';

import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { TC, TCService} from "./tc.service";
import { MessageType, Messages, MessagesComponent } from "../messages/messages.component";
import { ShopsComponent } from "../shops/shops.component";
import { Observable }     from 'rxjs/Observable';


@Component({
  selector: 'tc-view',
  templateUrl: './app/tc/tc-view.view.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, ShopsComponent, MessagesComponent ],
  providers: [ TCService ]
})
export class TCViewComponent implements OnInit {
  //@Input() tc: TC;
  @Input() tcStream: Observable<TC[]>;
  @Output() tcChange = new EventEmitter();

  edit: boolean;
  form : FormGroup;

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  messages: Messages = new Messages();

  mode = 'Observable';
  constructor (
    private tcService: TCService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  tc: TC;
  ngOnInit() {
    /*
    this.edit = !this.tc.id ;
    this.form = new FormGroup({
      name: new FormControl(this.tc.name, Validators.required),
      address: new FormControl(this.tc.address)
    });
    */
    this.tcStream.subscribe(
      function(tc) {
        this.tc = tc;
        this.edit = !this.tc.id ;
        this.form = new FormGroup({
          name: new FormControl(this.tc.name, Validators.required),
          address: new FormControl(this.tc.address)
        });
      }
    );

  }
  ngDoCheck(){

  }

  postTC: any;
  onSubmit(){
    console.log("tc.submit", this);
    this.postTC = this.tcService.sendTC(this.tc.id, this.form.value)
      .subscribe(
        data => this.success(data),
        err => this.fail(err)
      );
    return false;
  }

  success(data){
    this.postTC.unsubscribe();
    //this.tc = data;
    this.edit = false;
    this.tcChange.emit(data);
  }

  fail(err){
    this.postTC.unsubscribe();
    this.messages.add(err, MessageType.danger);

  }


}