import { Routes, RouterModule }  from '@angular/router';
import { NewCorporationComponent } from './newcorporation.component';

const routes: Routes = [
  {
    path: '',
    component: NewCorporationComponent
  }
];

export const routing = RouterModule.forChild(routes);