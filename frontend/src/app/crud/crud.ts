import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../auth/auth';

export interface Item {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class Crud {
  private api = '/api/protected-items';

  constructor(private http: HttpClient, private auth: Auth) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.api, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.api}/${id}`, { headers: this.getHeaders() });
  }

  create(name: string, description: string): Observable<Item> {
    return this.http.post<Item>(this.api, { name, description }, { headers: this.getHeaders() });
  }

  update(id: number, name: string, description: string): Observable<Item> {
    return this.http.put<Item>(`${this.api}/${id}`, { name, description }, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`, { headers: this.getHeaders() });
  }
}
