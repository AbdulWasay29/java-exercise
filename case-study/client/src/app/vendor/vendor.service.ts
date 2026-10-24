import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(public http: HttpClient) {}

  get(): Observable<{ _embedded: { vendors: Vendor[] } }> {
    return this.http.get<{ _embedded: { vendors: Vendor[] } }>('http://localhost:8080/vendors');
  }
}
