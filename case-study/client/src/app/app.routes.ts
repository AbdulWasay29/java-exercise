import { Routes } from '@angular/router';
import { VendorHome } from './vendor/vendor-home/vendor-home';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'vendors', component: VendorHome }
];
