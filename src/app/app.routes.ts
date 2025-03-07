import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component'),
    canActivate: [noAuthGuard]
  },

  {
    path: 'gastos',
    loadComponent: () => import('./features/expenses/expenses.component'),
    canActivate: [authGuard]
  },

  {
    path: 'resumen',
    loadComponent: () => import('./features/expenses/components/summary/summary.component'),
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'gastos', pathMatch: 'full'  }
];
