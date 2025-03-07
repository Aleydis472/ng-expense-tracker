import { Injectable, inject} from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private currentUser: User | null = null;

  constructor() {
    this.loadUserFromSession();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.saveUserToSession(user);
      } else {
        this.clearSession();
      }
      this.currentUser = user;
    });
  }

  private saveUserToSession(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }

  private loadUserFromSession(): void {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  private clearSession(): void {
    sessionStorage.removeItem('user');
    this.currentUser = null;
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      this.saveUserToSession(userCredential.user);
      this.router.navigate(['/gastos']);
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.clearSession();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  getUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

