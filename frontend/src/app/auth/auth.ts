import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private api = '/api/auth';

  constructor(private http: HttpClient) {}


  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.api}/register`, { username, password, role });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string, role: string }>(`${this.api}/login`, { username, password }).pipe(
      tap(res => {
        if (res.token) localStorage.setItem('token', res.token);
        if (res.role) localStorage.setItem('role', res.role);
      })
    );
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
