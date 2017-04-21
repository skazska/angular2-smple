import { provideRouter, RouterConfig } from '@angular/router';

import {DashboardComponent} from "./dashboard.component";
import {AuthGuard} from "../auth-guard.service";

export const dashboardRoutes: RouterConfig = [
    { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

