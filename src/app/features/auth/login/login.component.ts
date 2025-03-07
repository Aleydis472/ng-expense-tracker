import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/gastos']);
    }
  }

  async login() {
    try {
      await this.authService.loginWithGoogle();
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }
}
