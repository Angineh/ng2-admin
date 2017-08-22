import { Routes, RouterModule }  from '@angular/router';
import { DealflowListsComponent } from './dealflowlists.component';

const routes: Routes = [
  {
    path: '',
    component: DealflowListsComponent
  }
];

export const routing = RouterModule.forChild(routes);