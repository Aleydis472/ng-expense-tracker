import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private authService = inject(AuthService);

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
