import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../Services/User/login-register.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginCOmponentComponent {
  username!: string;
  password!: string;
  showAlert = false;

  constructor(private authService: LoginRegisterService, private router: Router) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.showAlert = true;
      return;
    }
    this.authService.login(this.username, this.password)
      .subscribe(
        (response: any) => {
          // Extract token from response
          const token = response.token;
          console.log(token)

          // Store token in local storage
          localStorage.setItem('token', token);
          this.authService.SetLoggedIn()
          // Navigate to home page
          this.router.navigate(['/feed']);
        },
        error => {
          // Handle login error
        }
      );
  }
}
