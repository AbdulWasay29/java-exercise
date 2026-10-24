import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-home',
  imports: [MatCardModule, MatListModule],
  templateUrl: './vendor-home.html',
  styleUrl: './vendor-home.scss'
})
export class VendorHome implements OnInit {
  vendors = signal<Vendor[]>([]);

  constructor(public vendorService: VendorService) {}

  ngOnInit(): void {
    this.vendorService.get().subscribe({
      next: (payload) => this.vendors.set(payload._embedded.vendors),
      error: (error: Error) => console.error(error)
    });
  }
}
