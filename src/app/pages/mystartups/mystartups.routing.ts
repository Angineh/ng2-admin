import { Routes, RouterModule }  from '@angular/router';
import { MyStartupsComponent } from './mystartups.component';

const routes: Routes = [
  {
    path: '',
    component: MyStartupsComponent
  }
];

export const routing = RouterModule.forChild(routes);