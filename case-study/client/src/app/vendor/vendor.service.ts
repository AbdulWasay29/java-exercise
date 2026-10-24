import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Vendor } from './vendor';

interface VendorApiResponse extends Omit<Vendor, 'id'> {
  id?: number;
  ID?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(public http: HttpClient) {}

  getVendors(): Observable<Vendor[]> {
    return this.http.get<VendorApiResponse[]>('http://localhost:8080/api/vendors').pipe(
      map((vendors) => vendors.map((vendor) => this.toVendor(vendor)))
    );
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    const { id, ...vendorFields } = vendor;
    return this.http.put<VendorApiResponse>('http://localhost:8080/api/vendors', {
      ...vendorFields,
      ID: id
    }).pipe(map((response) => this.toVendor(response)));
  }

  createVendor(vendor: Vendor): Observable<Vendor> {
    const { id: _id, ...vendorFields } = vendor;
    return this.http.post<VendorApiResponse>('http://localhost:8080/api/vendors', vendorFields)
      .pipe(map((response) => this.toVendor(response)));
  }

  deleteVendor(id: number): Observable<number> {
    return this.http.delete<number>(`http://localhost:8080/api/vendors/${id}`);
  }

  private toVendor(vendor: VendorApiResponse): Vendor {
    const id = vendor.id ?? vendor.ID;
    if (id === undefined) {
      throw new Error('Vendor API response did not include an ID.');
    }

    return {
      id,
      name: vendor.name,
      address: vendor.address,
      city: vendor.city,
      province: vendor.province,
      postalCode: vendor.postalCode,
      phone: vendor.phone,
      type: vendor.type,
      email: vendor.email
    };
  }
}
