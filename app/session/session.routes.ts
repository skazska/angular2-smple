import { provideRouter, RouterConfig } from '@angular/router';

import {LoginComponent} from "./login.component";

export const sessionRoutes: RouterConfig = [
    { path: 'Login', component: LoginComponent }
];

