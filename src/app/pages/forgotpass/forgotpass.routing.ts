import { Routes, RouterModule }  from '@angular/router';

import { Forgotpass } from './forgotpass.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Forgotpass
  }
];

export const routing = RouterModule.forChild(routes);
