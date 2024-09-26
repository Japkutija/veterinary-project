import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl = 'http://localhost:8080/api/user';
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private isFetchingProfile = false;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/profile`, { withCredentials: true }).pipe(
      tap((user: User) => {
        this.currentUser.next(user);
      }),
      catchError((error: any) => {
        console.error('Error fetching profile:', error);
        return throwError('Failed to fetch profile.');
      })
    );
  }
  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }
  fetchAndUpdateUserProfile(): void {
    if (!this.isFetchingProfile) {
      this.isFetchingProfile = true;
      this.getProfile().subscribe();
    }
  }
}
