import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const loginData = {
      username: email,
      password: password,
    };

    return this.http.post(`${this.apiUrl}/login`, loginData, { withCredentials: true }).pipe(
      catchError((error: any) => {
        console.error('Error occurred during login:', error);
        return throwError('Login failed. Please try again.');
      })
    );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        localStorage.removeItem('accessToken');
        this.authStatus.next(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        // Handle error case (optional)
      },
    });
    this.authStatus.next(false);
    localStorage.removeItem('accessToken');
  }

  getAuthStatus(): Observable<boolean> {
    this.authStatus.next(this.isAuthenticated());
    return this.authStatus.asObservable();
  }

  setAuthStatus(isAuthenticated: boolean): void {
    this.authStatus.next(isAuthenticated);
  }
  isAuthenticated(): boolean {
    return this.hasToken() && !this.isTokenExpired();
  }

  private isTokenExpired(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return true;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const now = Math.floor(new Date().getTime() / 1000);

    return now > expiry;
  }
}
