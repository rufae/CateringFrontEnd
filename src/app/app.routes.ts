import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full',
  },
  {
    path: 'encargo',
    loadComponent: () => import('./encargo/encargo.component').then( m => m.EncargoComponent)
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.component').then( m => m.MenuComponent)
  },
  {
    path: 'clientes',
    loadComponent: () => import('./cliente/cliente.component').then( m => m.ClienteComponent)
  },
  {
    path: 'empleado',
    loadComponent: () => import('./empleado/empleado.component').then( m => m.EmpleadoComponent)
  },
    {
        path: 'navbar',
        loadComponent: () => import('./navbar/navbar.component').then( m => m.NavbarComponent)
    }
];
