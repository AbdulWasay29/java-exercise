import { Routes } from '@angular/router';
import { VendorHome } from '@app/vendor/vendor-home/vendor-home';
import { Home } from '@app/home/home';
import { ProductHome } from '@app/product/product-home/product-home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'vendors', component: VendorHome },
  { path: 'products', component: ProductHome }
];
