import { provideRouter, RouterConfig } from '@angular/router';

import {AuthGuard} from "../auth-guard.service";
import {ClientsComponent} from "./clients.component";
import {ClientViewComponent} from "./client-view.component";

export const clientsRoutes: RouterConfig = [
  { path: 'Clients', component: ClientsComponent, canActivate: [AuthGuard] },
//  { path: 'Clients', redirectTo:"Clients/list", canActivate: [AuthGuard] },
//  { path: 'Clients/list', component: ClientsComponent, canActivate: [AuthGuard] },
//  { path: 'Clients/view/:clientId', component: ClientViewComponent, canActivate: [AuthGuard] },
//  { path: 'Clients/new', component: ClientEditComponent, canActivate: [AuthGuard] }
];

