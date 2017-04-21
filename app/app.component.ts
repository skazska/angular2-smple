import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { SessionService } from "./session/session.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MenuComponent } from "./menu/menu.component";

import './rxjs-operators';
import {TCComponent} from "./tc/tc.component";
import {LoginComponent} from "./session/login.component";
import {AuthGuard} from "./auth-guard.service";
import {ClientsComponent} from "./clients/clients.component";

@Component({
    selector: 'my-app',
    templateUrl: './app/app.view.html',
    directives: [ ROUTER_DIRECTIVES, LoginComponent, MenuComponent ],
    providers: [ SessionService, HTTP_PROVIDERS, AuthGuard ],
    precompile: [ DashboardComponent, TCComponent, LoginComponent, MenuComponent, ClientsComponent ]
})

export class AppComponent {

  authenticated: boolean;

  constructor (
    private sessionService: SessionService
  ) { }
  ngOnInit(){
  }
  ngDoCheck(){
  }

}
