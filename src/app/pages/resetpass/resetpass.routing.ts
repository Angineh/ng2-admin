import { Routes, RouterModule }  from '@angular/router';

import { Resetpass } from './resetpass.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: ':api_key',
    component: Resetpass
  }
];

export const routing = RouterModule.forChild(routes);
