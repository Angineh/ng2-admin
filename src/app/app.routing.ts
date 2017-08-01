import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/index';

/*export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/dashboard' }
];*/

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', redirectTo: 'verify', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', redirectTo: 'pages', pathMatch: 'full', canActivate: [AuthGuard] },
  //{ path: '#', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
