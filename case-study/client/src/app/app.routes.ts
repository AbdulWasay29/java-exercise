import { Routes } from '@angular/router';
import { VendorHome } from '@app/vendor/vendor-home/vendor-home';
import { Home } from '@app/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'vendors', component: VendorHome }
];
