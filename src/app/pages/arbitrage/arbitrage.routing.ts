import { Routes, RouterModule }  from '@angular/router';
import { ArbitrageComponent } from './arbitrage.component';

const routes: Routes = [
  {
    path: '',
    component: ArbitrageComponent
  }
];

export const routing = RouterModule.forChild(routes);