import { Component, InputSignal, OnInit, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Vendor } from '@app/vendor/vendor';
import { VENDOR_DEFAULT } from '@app/constants';
import { ValidatePhone } from '@app/validators/phone.validator';

@Component({
  selector: 'app-vendor-details',
  imports: [ReactiveFormsModule, MatButtonModule, MatError, MatFormFieldModule, MatInputModule, MatLabel],
  templateUrl: './vendor-details.html',
  styleUrl: './vendor-details.scss'
})
export class VendorDetails implements OnInit {
  vendor: InputSignal<Vendor> = input<Vendor>(VENDOR_DEFAULT);
  saved = output<Vendor>();
  closed = output<void>();
  deleted = output<number>();

  vendorForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    province: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    postalCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, ValidatePhone] }),
    type: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] })
  });

  ngOnInit(): void {
    this.vendorForm.setValue(this.vendor());
  }

  save(): void {
    this.saved.emit(this.vendorForm.getRawValue());
  }
}
