import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../Services/User/login-register.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent implements OnInit{
  username!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  constructor(private authService: LoginRegisterService, private router: Router) { }
  ngOnInit() {
  }
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      // Passwords do not match
      return;
    }
    this.authService.register(this.username, this.email, this.password)
      .subscribe(
        () => {
          // Registration successful, navigate to login page
          this.router.navigate(['/login']);
        },
        error => {
          // Handle registration error
        }
      );
  }
}
