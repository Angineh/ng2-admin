import { Routes, RouterModule }  from '@angular/router';
import { CorporationsComponent } from './corporations.component';

const routes: Routes = [
  {
    path: '',
    component: CorporationsComponent
  }
];

export const routing = RouterModule.forChild(routes);