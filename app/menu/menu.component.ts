import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router, ActivatedRoute }    from '@angular/router';
import {AuthGuard} from "../auth-guard.service";
/**
 * Created by ska on 7/27/16.
 */

@Component({
  selector: 'main-menu',
  templateUrl: './app/menu/menu.view.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ AuthGuard ]
})

export class MenuComponent {
  constructor(
    private authGuard: AuthGuard,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  display(path){
    return this.authGuard.isPathAuthorized(path);
  }

}
