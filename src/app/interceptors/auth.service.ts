import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Add this line
import { BehaviorSubject, Observable } from 'rxjs';
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
      username: email, // assuming your backend expects 'username'
      password: password,
    };

    return this.http.post(`${this.apiUrl}/login`, loginData, { withCredentials: true });
  }

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<any>('/api/login', { email, password });
  // }

  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        // Handle error case (optional)
      },
    });
    this.authStatus.next(false);
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  setAuthStatus(isAuthenticated: boolean): void {
    this.authStatus.next(isAuthenticated);
  }
}
