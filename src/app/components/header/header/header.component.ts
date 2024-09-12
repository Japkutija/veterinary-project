import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  authTitle: string = 'Login';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status) => {
      this.authTitle = status ? 'Logout' : 'Login';
    });
  }

  handleAuthAction(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }


}
