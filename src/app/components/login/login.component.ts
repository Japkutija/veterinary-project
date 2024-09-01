import { AuthService } from '../../interceptors/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
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
          console.log("Login check: ", this.isAuthenticated);

          // Navigate to the home page or protected page
          this.router.navigate(['/home']);
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
    console.log("Checking value of the token in the local storage: ", localStorage.getItem('accessToken'));
    localStorage.removeItem('accessToken');
    console.log("Checking value of the token in the local storage: ", localStorage.getItem('accessToken'));
    this.authService.logout();
  }
}
