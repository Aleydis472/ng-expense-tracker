import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  private authService = inject(AuthService);
  userLogged!: User | null
  ngOnInit(): void {
    console.log(this.authService.getUser(), 'veo que trae el usuario');
    this.getUser()

  }

  getUser(): void{
   this.userLogged = this.authService.getUser()
  }

  logout() {
    this.authService.logout();
  }


}
