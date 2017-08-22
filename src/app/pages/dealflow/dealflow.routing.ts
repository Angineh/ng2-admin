import { Routes, RouterModule }  from '@angular/router';
import { DealflowComponent } from './dealflow.component';

const routes: Routes = [
  {
    path: ':listName',
    component: DealflowComponent
  }
];

export const routing = RouterModule.forChild(routes);