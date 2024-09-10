import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  login(): void {
    this.errorMessage = ''; // Clear previous error messages

    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          // Store the access token
          console.log('Response: ', response);
          localStorage.setItem('accessToken', response.jwt);

          // Update authentication status
          this.authService.setAuthStatus(true);
          console.log('Login check: ', this.isAuthenticated);

          // Navigate to the home page or protected page
          this.router.navigate(['/pet-management']);
        },
        (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      );
    } else {
      this.errorMessage = 'Please, enter both email and password.';
    }
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    this.authService.logout();
  }
}
