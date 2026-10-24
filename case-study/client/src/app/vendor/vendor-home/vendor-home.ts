import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';
import { VendorDetails } from '@app/vendor/vendor-details/vendor-details';
import { VENDOR_DEFAULT } from '@app/constants';

@Component({
  selector: 'app-vendor-home',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTooltipModule, VendorDetails],
  templateUrl: './vendor-home.html',
  styleUrl: './vendor-home.scss'
})
export class VendorHome implements OnInit {
  vendors = signal<Vendor[]>([]);
  vendorInDetail = signal<Vendor>(VENDOR_DEFAULT);
  newVendor = signal(false);

  constructor(public vendorService: VendorService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.vendorService.getAll().subscribe({
      next: (payload: Vendor[]) => this.vendors.set(payload),
      error: (error: Error) => console.error(error),
      complete: () => this.selectVendor(VENDOR_DEFAULT)
    });
  }

  selectVendor(vendor: Vendor): void {
    this.vendorInDetail.set(vendor);
    this.newVendor.set(false);
  }

  hasVendorSelected(): boolean {
    return this.vendorInDetail().id > 0 || this.newVendor();
  }

  addNewVendor(): void {
    this.vendorInDetail.set(VENDOR_DEFAULT);
    this.newVendor.set(true);
  }

  saveVendor(vendor: Vendor): void {
    if (this.newVendor()) {
      this.createVendor(vendor);
    } else {
      this.updateVendor(vendor);
    }
  }

  updateVendor(vendor: Vendor): void {
    this.vendorService.update(vendor).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }

  createVendor(vendor: Vendor): void {
    this.vendorService.create(vendor).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }

  deleteVendor(id: number): void {
    this.vendorService.delete(id.toString()).subscribe({
      next: (deletedCount: number) => console.log(`${deletedCount} deleted`),
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }
}
