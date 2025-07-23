import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login), },
  { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.Register), },
  { path: 'list', loadComponent: () => import('./crud/list/list').then(m => m.List), canActivate: [authGuard] },
  { path: 'create', loadComponent: () => import('./crud/create/create').then(m => m.Create), canActivate: [authGuard] },
  { path: 'edit/:id', loadComponent: () => import('./crud/edit/edit').then(m => m.Edit), canActivate: [authGuard] },
  { path: '**', redirectTo: 'list' }
];
