import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PRODUCT_DEFAULT } from '@app/constants';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';

@Component({
  selector: 'app-product-details',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatError,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  product = input<Product>(PRODUCT_DEFAULT);
  vendors = input<Vendor[]>([]);
  isNew = input(false);
  saved = output<Product>();
  deleted = output<string>();
  closed = output<void>();

  productForm = new FormGroup({
    id: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    vendorId: new FormControl(0, { nonNullable: true, validators: [Validators.min(1)] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    cost: new FormControl<number | null>(null, { validators: [Validators.required] }),
    msrp: new FormControl<number | null>(null, { validators: [Validators.required] }),
    rop: new FormControl<number | null>(null, { validators: [Validators.required] }),
    eoq: new FormControl<number | null>(null, { validators: [Validators.required] }),
    qoh: new FormControl<number | null>(null, { validators: [Validators.required] }),
    qoo: new FormControl<number | null>(null, { validators: [Validators.required] })
  });

  ngOnInit(): void {
    this.productForm.setValue({
      id: this.product().id,
      vendorId: this.product().vendorId,
      name: this.product().name,
      cost: this.product().id ? this.product().cost : null,
      msrp: this.product().id ? this.product().msrp : null,
      rop: this.product().id ? this.product().rop : null,
      eoq: this.product().id ? this.product().eoq : null,
      qoh: this.product().id ? this.product().qoh : null,
      qoo: this.product().id ? this.product().qoo : null
    });
  }

  save(): void {
    const value = this.productForm.getRawValue();
    if (
      value.cost === null ||
      value.msrp === null ||
      value.rop === null ||
      value.eoq === null ||
      value.qoh === null ||
      value.qoo === null
    ) {
      return;
    }

    this.saved.emit({
      id: value.id,
      vendorId: value.vendorId,
      name: value.name,
      cost: value.cost,
      msrp: value.msrp,
      rop: value.rop,
      eoq: value.eoq,
      qoh: value.qoh,
      qoo: value.qoo
    });
  }
}
