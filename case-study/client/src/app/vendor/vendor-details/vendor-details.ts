import { Component, InputSignal, OnInit, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Vendor } from '../vendor';
import { VENDOR_DEFAULT } from '../../constants';

@Component({
  selector: 'app-vendor-details',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.scss'
})
export class VendorDetails implements OnInit {
  vendor: InputSignal<Vendor> = input<Vendor>(VENDOR_DEFAULT);
  saved = output<Vendor>();
  closed = output<void>();

  vendorForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    address: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    province: new FormControl('', { nonNullable: true }),
    postalCode: new FormControl('', { nonNullable: true }),
    phone: new FormControl('', { nonNullable: true }),
    type: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true })
  });

  ngOnInit(): void {
    this.vendorForm.setValue(this.vendor());
  }

  save(): void {
    this.saved.emit(this.vendorForm.getRawValue());
  }
}
