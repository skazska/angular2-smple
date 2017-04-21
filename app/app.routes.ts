import { provideRouter, RouterConfig } from '@angular/router';
import {AuthGuard} from "./auth-guard.service";

import {dashboardRoutes} from "./dashboard/dashboard.routes";
import {tcRoutes} from "./tc/tc.routes";
import {sessionRoutes} from "./session/session.routes";
import {AuthService} from "./auth.service";
import {clientsRoutes} from "./clients/clients.routes";

const routes: RouterConfig = [
  { path: '', redirectTo: '/Dashboard', pathMatch: 'full' },
  ... sessionRoutes,
  ... dashboardRoutes,
  ... tcRoutes,
  ... clientsRoutes,
  { path: '**', redirectTo: '/Dashboard' }
];

export const appRouterProviders = [
    provideRouter(routes), AuthGuard, AuthService
];
