import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  private authService = inject(AuthService);
  spinner = inject(NgxSpinnerService);

  userLogged!: User | null

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void{
   this.userLogged = this.authService.getUser()
  }

  logout() {
    this.spinner.show();
    this.authService.logout();
    this.spinner.hide();
  }


}
