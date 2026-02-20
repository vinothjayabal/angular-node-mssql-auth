import { Routes } from '@angular/router';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: Registration },
  { path: 'login', component: Login },
  { path: 'home', component: Home }
];
