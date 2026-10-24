import { Vendor } from '@app/vendor/vendor';
import { Product } from '@app/product/product';

export const VENDOR_DEFAULT: Vendor = {
  id: 0,
  name: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  phone: '',
  type: '',
  email: ''
};

export const PRODUCT_DEFAULT: Product = {
  id: '',
  vendorId: 0,
  name: '',
  cost: 0,
  msrp: 0,
  rop: 0,
  eoq: 0,
  qoh: 0,
  qoo: 0
};
