import { bootstrap }    from '@angular/platform-browser-dynamic';
//import {FormsModule} from '@angular/forms';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import { appRouterProviders } from './app.routes';

import { AppComponent } from './app.component';

//bootstrap(AppComponent, {providers:[ appRouterProviders ], modules:[FormsModule]});
bootstrap(AppComponent, [ appRouterProviders, disableDeprecatedForms(), provideForms() ]);