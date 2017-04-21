import { provideRouter, RouterConfig } from '@angular/router';

import {TCComponent} from "./tc.component";
import {AuthGuard} from "../auth-guard.service";

export const tcRoutes: RouterConfig = [
    { path: 'TC', component: TCComponent, canActivate: [AuthGuard]  }
];

