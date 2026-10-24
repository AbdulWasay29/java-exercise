import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PRODUCT_DEFAULT } from '@app/constants';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { ProductDetails } from '@app/product/product-details/product-details';
import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';

@Component({
  selector: 'app-product-home',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    ProductDetails
  ],
  templateUrl: './product-home.html',
  styleUrl: './product-home.scss'
})
export class ProductHome implements OnInit {
  readonly tableColumns = ['id', 'vendor', 'name', 'cost', 'msrp', 'qoh'];
  readonly productsTable = new MatTableDataSource<Product>();
  readonly products = signal<Product[]>([]);
  readonly vendors = signal<Vendor[]>([]);
  readonly productInDetail = signal<Product>(PRODUCT_DEFAULT);
  readonly newProduct = signal(false);

  constructor(
    public productService: ProductService,
    public vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loadProducts();
    this.loadVendors();
    this.productInDetail.set(PRODUCT_DEFAULT);
    this.newProduct.set(false);
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products: Product[]) => {
        this.products.set(products);
        this.productsTable.data = products;
      },
      error: (error: Error) => console.error(error)
    });
  }

  loadVendors(): void {
    this.vendorService.getAll().subscribe({
      next: (vendors: Vendor[]) => this.vendors.set(vendors),
      error: (error: Error) => console.error(error)
    });
  }

  vendorOfId(vendorId: number): Vendor | undefined {
    return this.vendors().find((vendor) => vendor.id === vendorId);
  }

  selectProduct(product: Product): void {
    this.productInDetail.set(product);
    this.newProduct.set(false);
  }

  hasSelectedProduct(): boolean {
    return this.productInDetail().id !== '' || this.newProduct();
  }

  addNewProduct(): void {
    this.productInDetail.set(PRODUCT_DEFAULT);
    this.newProduct.set(true);
  }

  saveProduct(product: Product): void {
    if (this.newProduct()) {
      this.createProduct(product);
    } else {
      this.updateProduct(product);
    }
  }

  createProduct(product: Product): void {
    this.productService.create(product).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }

  updateProduct(product: Product): void {
    this.productService.update(product).subscribe({
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }

  deleteProduct(id: string): void {
    this.productService.delete(id).subscribe({
      next: (deletedCount: number) => console.log(`${deletedCount} deleted`),
      error: (error: Error) => console.error(error),
      complete: () => this.refresh()
    });
  }
}
