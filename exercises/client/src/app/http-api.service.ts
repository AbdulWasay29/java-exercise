import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpApiService<T> {
  constructor(
    private readonly http: HttpClient,
    private readonly endPoint: string
  ) {}

  apiURL(): string {
    return window.location.hostname === 'localhost' ? 'http://localhost:8080/api' : '/api';
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiURL()}/${this.endPoint}`);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiURL()}/${this.endPoint}/${id}`);
  }

  getAllById(id: number): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiURL()}/${this.endPoint}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${this.apiURL()}/${this.endPoint}`, data);
  }

  update(data: T): Observable<T> {
    return this.http.put<T>(`${this.apiURL()}/${this.endPoint}`, data);
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiURL()}/${this.endPoint}/${id}`);
  }
}
